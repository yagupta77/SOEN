import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

function connect() {
  const uri = process.env.MONGODB_URL; // Load the MONGODB_URL from the .env file

  if (!uri) {
    console.error('Error: MONGODB_URL is not defined. Check your .env file.');
    return;
  }

  mongoose
    .connect(uri) // No need for useNewUrlParser or useUnifiedTopology
    .then(() => {
      console.log('Connected to MongoDB Atlas');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB Atlas:', err.message);
    });
}

export default connect;
