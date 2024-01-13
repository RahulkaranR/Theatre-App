const express = require("express");
const authContriller = require("../controllers/authControllers");



const routes = express.Router();

routes.route("/").post(authContriller.login);

routes.route("/refresh").get(authContriller.refresh);

routes.route("/logout").post(authContriller.logout);



module.exports = routes


