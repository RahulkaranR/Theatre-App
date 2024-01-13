const express = require("express");
const ticketControllsers = require("../controllers/ticketsControllers");
const verifyJWT = require("../middleware/verifyJWT")

const routes = express.Router()

routes.route("/pdf/:id").get(ticketControllsers.getpdftickets)

routes.use(verifyJWT)

routes.route("/")
    .get(ticketControllsers.getalltickets)
    .post(ticketControllsers.bookTicket)

routes.route("/:id")
    .get(ticketControllsers.getTicket)
    .delete(ticketControllsers.deleteTickets)



//routes.get("/", ticketControllsers.getalltickets)
//routes.get("/:id", ticketControllsers.getTicket)

//routes.post("/", ticketControllsers.bookTicket)
//routes.delete("/:id", ticketControllsers.deleteTickets)

module.exports = routes;
