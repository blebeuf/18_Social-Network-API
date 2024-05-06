const { User, Thought } = require("../models");

const userController = {
  // Get all users
  async getAllUser(req, res) {
    try {
      const users = await User.find({})
        .populate({
          path: "friends",
          select: "-__v" // Exclude version keys from the friend objects
        })
        .select("-__v") // Exclude the version key from the main user objects
        .sort({ _id: -1 }); // Sort by user ID in descending order
      res.json(users);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  },

  // Get a single user by ID
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id)
        .populate("thoughts")
        .populate("friends");
      if (!user) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  // Update user by ID
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  // Delete a user by ID
  async removeUser(req, res) {
    try {
      const userToDelete = await User.findByIdAndDelete(req.params.id);
      if (!userToDelete) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      await Thought.deleteMany({ _id: { $in: userToDelete.thoughts } });
      res.json({ message: "User and all associated thoughts deleted!" });
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  // Add a friend to user
  async addFriend(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true, runValidators: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "No user with this id" });
      }
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  // Remove a friend from user
  async removeFriend(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  }
};

module.exports = userController;
