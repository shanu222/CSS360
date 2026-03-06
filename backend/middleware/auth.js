import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Session from '../models/Session.js';

const resolveToken = (req) => {
  const header = req.header('Authorization') || '';
  if (!header.startsWith('Bearer ')) return null;
  return header.slice('Bearer '.length).trim();
};

export const authenticate = async (req, res, next) => {
  try {
    const token = resolveToken(req);
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'Server auth misconfiguration' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token user' });
    }

    if (!decoded.sid || !user.activeSessionId || decoded.sid !== user.activeSessionId || !user.isLoggedIn) {
      return res.status(401).json({ error: 'Session expired. Please log in again.' });
    }

    const activeSession = await Session.findOne({ sessionId: decoded.sid, active: true });
    if (!activeSession) {
      return res.status(401).json({ error: 'Session is no longer active' });
    }

    if (new Date(activeSession.expiresAt).getTime() < Date.now()) {
      activeSession.active = false;
      activeSession.logoutTime = new Date();
      await activeSession.save();
      return res.status(401).json({ error: 'Session expired. Please log in again.' });
    }

    user.lastActive = new Date();
    await user.save();

    req.userId = user._id.toString();
    req.user = decoded;
    req.userDoc = user;
    req.sessionDoc = activeSession;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const optionalAuth = async (req, _res, next) => {
  try {
    const token = resolveToken(req);
    if (!token || !process.env.JWT_SECRET) return next();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user || !user.activeSessionId || decoded.sid !== user.activeSessionId) return next();

    req.userId = user._id.toString();
    req.user = decoded;
    req.userDoc = user;
  } catch (_error) {
    // Continue without auth context for optional auth.
  }

  return next();
};

export const adminOnly = async (req, res, next) => {
  if (req.userDoc?.role === 'admin') {
    return next();
  }
  return res.status(403).json({ error: 'Admin access required' });
};
