const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtsById,
  createThought,
  updateThought,
  deleteThought,
} = require("../../controllers/thought-controller");

//api/thoughts

router.route("/").get(getAllThoughts).post(createThought);

router.route('/:thoughtId').get(.getThoughtsById).put(updateThought).delete(deleteThought);

module.exports = router