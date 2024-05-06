const router = require("express").Router();
const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

// Set up routes for the Thoughts API

// Routes for accessing all thoughts and creating a new thought
router.route("/")
  .get(getAllThought) // GET all thoughts
  .post(createThought); // POST a new thought

// Routes for accessing, updating, and deleting a specific thought by its ID
router.route("/:id")
  .get(getThoughtById) // GET a single thought by ID
  .put(updateThought) // PUT to update a thought by ID
  .delete(removeThought); // DELETE to remove a thought by ID

// Route for adding a reaction to a thought
router.route("/:thoughtId/reactions")
  .post(addReaction); // POST a reaction to a specific thought

// Route for deleting a specific reaction from a thought
router.route("/:thoughtId/reactions/:reactionId")
  .delete(removeReaction); // DELETE a reaction from a thought

module.exports = router;
