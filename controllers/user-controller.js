const { User } = require("../models");

module.exports = {
  //get all users
  getUser(req, res) {
    User.find({})
      .select("-__v")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //get single user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // post a new user
  createUser(req, res) {
    Tags.create(req.body)
      .then((tag) => {
        return Post.findOneAndUpdate(
          { _id: req.body.postId },
          // Use $addToSet instead of $push to avoid duplicates
          { $addToSet: { tags: tag._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "Tag created, but found no post with that ID" })
          : res.json("Created the tag 🎉")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //update user
  updateUser(req, res) {
    User.findOneAndUpdate(
      {
        _id: params.id,
      },
      body,
      {
        new: true,
        runValidators: true,
      }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({
            message: "No user found with this id.",
          });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  // delete user
  deleteUser(req, res) {
    User.findOneAndDelete({
      _id: params.id,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({
            message: "No user found with this id.",
          });
          return;
        }
        return dbUserData;
      })
      .then((dbUserData) => {
        User.updateMany(
          {
            _id: {
              $in: dbUserData.friends,
            },
          },
          {
            $pull: {
              friends: params.userId,
            },
          }
        )
          .then(() => {
            Thought.deleteMany({
              username: dbUserData.username,
            })
              .then(() => {
                res.json({
                  message: "User deleted successfully",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(400).json(err);
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};
