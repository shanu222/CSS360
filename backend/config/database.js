import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    console.log('🔄 Attempting MongoDB connection...');
    console.log('📍 Connection string format:', process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 30) + '...' : 'Not found');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/css360-academy', {
      serverSelectionTimeoutMS: 10000, // 10 second timeout
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Full error:', JSON.stringify(error, null, 2));
    console.log('⚠️  Server will start without database. Some features may not work.');
    console.log('💡 Fix: Check MongoDB Atlas cluster status and Network Access settings');
  }
};
