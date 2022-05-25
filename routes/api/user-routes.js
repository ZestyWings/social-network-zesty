const router = require("express").Router();

const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/user-controller");

//api/users
router.route("/").get(getUser).post(createUser);

router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;
