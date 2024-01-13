const express = require("express");
const showsControllers = require("../controllers/showsControllers");
const verifyJWT = require("../middleware/verifyJWT")


const routes = express.Router();

routes.use(verifyJWT)

routes.route("/")
    .get(showsControllers.selectallshow)
    .post(showsControllers.createShow)

routes.route("/:id")
.get(showsControllers.selectSingleShow)
.patch(showsControllers.UpdateShow)
.delete(showsControllers.deactiveShows)


//routes.get("/", showsControllers.selectallshow);
//routes.get("/:id", showsControllers.selectSingleShow);

//routes.post("/", showsControllers.createShow);
//routes.patch("/:id", showsControllers.UpdateShow);
//routes.delete("/:id", showsControllers.deactiveShows);


module.exports = routes;

