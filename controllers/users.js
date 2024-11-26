const userService = require('../services/userService');

const userController = {
  registerUser: async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const user = await userService.createUser({ username, email, password });
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      next(error);
    }
  },

  loginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const token = await userService.loginUser(email, password);
      res.json({ message: 'Login successful', token });
    } catch (error) {
      next(error);
    }
  },

  getUserProfile: async (req, res, next) => {
    try {
      const userId = req.user.id; // Assuming the auth middleware attaches the user to the request
      const user = await userService.getUserById(userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  updateUserProfile: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const updates = req.body;
      const updatedUser = await userService.updateUser(userId, updates);
      res.json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
      next(error);
    }
  },

  deleteUserProfile: async (req, res, next) => {
    try {
      const userId = req.user.id;
      await userService.deleteUser(userId);
      res.json({ message: 'Profile deleted successfully' });
    } catch (error) {
      next(error);
    }
  },

  getAllUsers: async (req, res, next) => {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = userController;