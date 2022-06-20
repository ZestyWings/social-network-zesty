const { Thought, User } = require("../models");

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // get single thought by ID
  getThoughtsById(req, res) {
    Thought.findOne({
      _id: req.params.id,
    })
      .select("-__v")
      .sort({
        _id: -1,
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({
            message: "Not found with id",
          });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // post create new thought
  createThought(req, res) {
    Thought.create(body)
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          {
            _id: req.body.userId,
          },
          {
            $addToSet: {
              thoughts: dbThoughtData._id,
            },
          },
          {
            new: true,
          }
        );
      })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({
            message: "No user found",
          });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // put update thought by ID
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId,
      },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((updateThought) => {
        if (!updateThought) {
          return res.status(404).json({
            message: "No thought found",
          });
        }
        return res.json({
          message: "Success",
        });
      })
      .catch((err) => res.json(err));
  },
  // delete remove a thought by id
  deleteThought(req, res) {
    Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    })
      .then((deleteThought) => {
        if (!deleteThought) {
          return res.status(404).json({
            message: "No Thought Found",
          });
        }
        return User.findOneAndUpdate(
          {
            thoughts: req.params.thoughtId,
          },
          {
            $pull: {
              thoughts: req.params.thoughtId,
            },
          },
          {
            new: true,
          }
        );
      })
      .then((dbUsersData) => {
        if (!dbUserData) {
          res.status(404).json({
            message: "No thought found",
          });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
