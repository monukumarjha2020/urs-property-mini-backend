const mongoose = require('mongoose');

async function connectDB(uri) {
  if (!uri) throw new Error('MONGO_URI not provided');
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, { dbName: process.env.DB_NAME || undefined });
  console.log('✅ MongoDB connected');
}

module.exports = { connectDB };
