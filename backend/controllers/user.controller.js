import userModel from '../models/user.model.js';
import  * as userService from '../services/user.service.js';
import { validationResult } from 'express-validator';
import redisClient from '../services/redis.service.js';
export const createUserController = async (req, res) => {
  console.log('Request Body:', req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
   
      const user = await userService.createUser(req.body);
      const token = await user.generateJWT();
      delete user._doc.password;
      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
 
export const loginController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    console.log('Received Email:', email); // Log the incoming email for debugging

    // Find the user by email and include the password field
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
      console.log('User not found'); // Log if user is not found
      return res.status(401).json({
        errors: 'Invalid credentials'
      });
    }

    // Check if the password matches using the correct method: isValidPassword
    const isMatch = await user.isValidPassword(password);
    console.log('Password match result:', isMatch); // Log the result of password comparison

    if (!isMatch) {
      return res.status(401).json({
        errors: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = await user.generateJWT();
    return res.status(200).json({ user, token });

  } catch (error) {
    // Log any error that occurs
    console.error('Error occurred during login:', error);
    return res.status(400).json({ errors: error.message });
  }
};

export const profileController = async (req, res) => {
  console.log(req.user); // Log the decoded JWT payload (user data)
  
  res.status(200).json({
    user: req.user  // Send the user data in the response
  });
};

export const logoutController = async (req, res) => {
  try{
  const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
  redisClient.set(token, 'logout', 'EX', 60*60*24);
res.status(200).json({
  message: 'Logout successfully'
})

  }catch(err){
    console.log(err);
    res.status(400).send(err.message);
  }
}
export const getAllUsersController = async (req, res) => {
  try {

      const loggedInUser = await userModel.findOne({
          email: req.user.email
      })

      const allUsers = await userService.getAllUsers({ userId: loggedInUser._id });

      return res.status(200).json({
          users: allUsers
      })

  } catch (err) {

      console.log(err)

      res.status(400).json({ error: err.message })

  }
}