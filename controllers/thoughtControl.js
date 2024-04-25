// this is based on some logic used and taught to us within the Mini-project for module 18
const { Thought, User } = require("../models");

const thoughtController = {
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Get one thought by its ID
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        return res.status(404).json({ message: "No thought with this ID" });
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  // Create thought and associate it to a user
  async createThought(req, res) {
    try {
      const dbThoughtData = await Thought.create(req.body);
      const userData = await User.findByIdAndUpdate(
        req.body.userID,
        { $push: { thoughts: dbThoughtData._id } },
        { new: true }
      );
      res.json(userData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Update thought by its ID
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: "No thought by that ID" });
      }
      res.json(updatedThought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Delete a thought and update user associations
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.id);
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      await User.findByIdAndUpdate(
        thought.userID,
        { $pull: { thoughts: thought._id } },
        { new: true }
      );
      res.json({ message: "Thought deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Add a reaction to a thought
  async addReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "No thought found with that ID" });
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Delete a reaction from a thought
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "No thought found with that ID" });
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
