const express = require("express");
const movieControllers = require("../controllers/moviesControllers");
const verifyJWT = require("../middleware/verifyJWT")

const routes = express.Router();


routes.use(verifyJWT)

routes.route("/")
.get(movieControllers.getAllMovies)
.post(movieControllers.createMovie)

routes.route("/:id")
.get(movieControllers.getSingleMovie)
.patch(movieControllers.UpdateMovie)
.delete(movieControllers.deleteMovie)

//routes.get("/", movieControllers.getAllMovies);
//routes.get("/:id", movieControllers.getSingleMovie);
//routes.post("/", movieControllers.createMovie);
//routes.patch("/:id", movieControllers.UpdateMovie);
//routes.delete("/:id", movieControllers.deleteMovie);

module.exports = routes