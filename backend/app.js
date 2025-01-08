import express from 'express';
import morgan from 'morgan';
import connect from './db/db.js'; // MongoDB connection
import userRoutes from './routes/user.routes.js'; // Routes for user-related requests
import cookieParser from 'cookie-parser'; // For handling cookies
import cors from 'cors'; // For handling cross-origin requests
import projectRoutes from './routes/project.routes.js';
import aiRoutes from './routes/ai.routes.js';

// Connect to MongoDB
connect();

const app = express();

// Middleware to log HTTP requests
app.use(morgan('dev'));

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173' })); // Frontend's URL
app.use(express.urlencoded({ extended: true }));

// User-related routes should be under '/users'
app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use("/ai", aiRoutes)

// Simple default route
app.get('/', (req, res) => {
  res.send('Hello');
});

export default app;
