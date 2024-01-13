const express  = require("express");
const userControllers = require("../controllers/usersControllers")

const routes = express.Router();


routes.route("/")
    .get(userControllers.selectallusers)
    .post(userControllers.createUser)

routes.route("/:id")
    .patch(userControllers.updateUser)
    .delete(userControllers.deleteUser)


// router.get("/", userControllers.selectallusers);
// router.post("/", userControllers.createUser);
// router.patch("/:id", userControllers.updateUser);
// router.delete("/:id", userControllers.deleteUser);

module.exports = routes
