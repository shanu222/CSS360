import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import Session from '../models/Session.js';
import { sendSignupNotification } from '../services/emailService.js';
import { emitGlobalEvent } from '../services/realtimeService.js';

const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'shahnawaz9974balouch@gmail.com').toLowerCase();

const createToken = ({ user, sessionId }) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is required');
  }

  return jwt.sign(
    {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      sid: sessionId,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

const normalizeDeviceId = (value) => {
  const fallback = crypto.randomUUID();
  if (!value || typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
};

const publicUser = (user) => ({
  id: user._id.toString(),
  email: user.email,
  name: user.name,
  role: user.role,
  avatar: user.avatar || null,
  studyPlan: user.studyPlan || null,
  isLoggedIn: Boolean(user.isLoggedIn),
  activeDeviceId: user.activeDeviceId || null,
});

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body || {};

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    if (String(password).length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    const cleanEmail = String(email).trim().toLowerCase();

    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email: cleanEmail,
      password: hashedPassword,
      name: String(name).trim(),
      role: cleanEmail === ADMIN_EMAIL ? 'admin' : 'student',
    });

    sendSignupNotification({
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    }).catch((error) => {
      console.error('Signup email notification failed:', error.message);
    });

    emitGlobalEvent('auth:user-registered', {
      user: publicUser(user),
      createdAt: user.createdAt,
    });

    return res.status(201).json({
      message: 'User registered successfully. Please log in.',
      user: publicUser(user),
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, deviceId } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const normalizedDeviceId = normalizeDeviceId(deviceId);

    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (user.isLoggedIn && user.activeDeviceId && user.activeDeviceId !== normalizedDeviceId) {
      return res.status(409).json({
        error: 'You are already logged in on another device. Please log out from the previous device first.',
      });
    }

    if (user.activeSessionId) {
      await Session.updateMany(
        { sessionId: user.activeSessionId, active: true },
        { $set: { active: false, logoutTime: new Date() } }
      );
    }

    const sessionId = crypto.randomUUID();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + SESSION_MAX_AGE_MS);

    await Session.create({
      userId: user._id,
      sessionId,
      deviceId: normalizedDeviceId,
      userAgent: req.headers['user-agent'] || 'unknown',
      ipAddress: req.ip || req.socket?.remoteAddress || 'unknown',
      active: true,
      loginTime: now,
      expiresAt,
    });

    user.isLoggedIn = true;
    user.activeSessionId = sessionId;
    user.activeDeviceId = normalizedDeviceId;
    user.lastLoginAt = now;
    user.lastActive = now;
    await user.save();

    const token = createToken({ user, sessionId });

    emitGlobalEvent('auth:user-login', {
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      deviceId: normalizedDeviceId,
      at: now,
    });

    return res.json({
      message: 'Login successful',
      token,
      user: publicUser(user),
      session: {
        sessionId,
        deviceId: normalizedDeviceId,
        expiresAt,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Login failed' });
  }
};

export const logout = async (req, res) => {
  try {
    const user = req.userDoc;
    if (!user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const now = new Date();

    if (user.activeSessionId) {
      await Session.updateMany(
        { sessionId: user.activeSessionId, active: true },
        { $set: { active: false, logoutTime: now } }
      );
    }

    user.isLoggedIn = false;
    user.activeSessionId = null;
    user.activeDeviceId = null;
    user.lastActive = now;
    await user.save();

    emitGlobalEvent('auth:user-logout', {
      userId: user._id.toString(),
      email: user.email,
      at: now,
    });

    return res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ error: 'Logout failed' });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = req.userDoc;
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ user: publicUser(user) });
  } catch (error) {
    console.error('Get user error:', error);
    return res.status(500).json({ error: 'Failed to fetch user data' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = req.userDoc;
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { name, avatar, studyPlan } = req.body || {};

    if (typeof name === 'string' && name.trim().length > 0) user.name = name.trim();
    if (typeof avatar === 'string') user.avatar = avatar;
    if (studyPlan !== undefined) user.studyPlan = studyPlan;

    user.lastActive = new Date();
    await user.save();

    return res.json({
      message: 'Profile updated successfully',
      user: publicUser(user),
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({ error: 'Failed to update profile' });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password, deviceId } = req.body || {};
    const normalizedEmail = String(email || '').trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access denied' });
    }

    req.body = { email: normalizedEmail, password, deviceId };
    return login(req, res);
  } catch (error) {
    console.error('Admin login error:', error);
    return res.status(500).json({ error: 'Admin login failed' });
  }
};
