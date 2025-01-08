import express from 'express';
import morgan from 'morgan';
import connect from './backend/db/db.js'; // MongoDB connection
import userRoutes from './backend/routes/user.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors' // Routes for user-related requests

// Connect to MongoDB
connect();

const app = express();
app.use(cors());
// Middleware to log HTTP requests
app.use(morgan('dev'));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse URL-encoded bodies (e.g., form submissions)
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// User-related routes
app.use('/users', userRoutes);

// Simple default route
app.get('/', (req, res) => {
  res.send('Hello');
});


export default app;
