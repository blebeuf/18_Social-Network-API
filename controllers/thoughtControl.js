const { Thought, User } = require("../models");

const thoughtControl = {
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.error("Error fetching thoughts:", err);
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
      console.error("Error fetching thought by ID:", err);
      res.status(400).json(err);
    }
  },

  // Create thought and associate it to a user
  async createThought(req, res) {
    try {
      const dbThoughtData = await Thought.create(req.body);
      await User.findByIdAndUpdate(
        req.body.userID,
        { $push: { thoughts: dbThoughtData._id } },
        { new: true }
      );
      res.json(dbThoughtData);
    } catch (err) {
      console.error("Error creating thought:", err);
      res.status(500).json(err);
    }
  },

  // Update thought by its ID
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: "No thought by that ID" });
      }
      res.json(updatedThought);
    } catch (err) {
      console.error("Error updating thought:", err);
      res.status(500).json(err);
    }
  },

  // Remove a thought and update user associations
  async removeThought(req, res) {
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
      console.error("Error deleting thought:", err);
      res.status(500).json(err);
    }
  },

  // Add a reaction to a thought
  async addReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $addToSet: { reactions: req.body } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "No thought found with that ID" });
      }
      res.json(thought);
    } catch (err) {
      console.error("Error adding reaction:", err);
      res.status(500).json(err);
    }
  },

  // Remove a reaction from a thought
  async removeReaction(req, res) {
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
      console.error("Error removing reaction:", err);
      res.status(500).json(err);
    }
  }
};

module.exports = thoughtControl;
