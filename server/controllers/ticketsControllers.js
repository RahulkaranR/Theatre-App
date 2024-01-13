const Tickets = require("../module/Tickets");
const Shows = require("../module/Shows");
const Users = require("../module/Users");
const Movies = require("../module/Movies");

const asyncHandler = require("express-async-handler");

// User can book tickets
// Create

const bookTicket = asyncHandler(async(req, res) => {
    const { showsId, seats } = req.body;
    //console.log(!userId, !showsbydateId, !showsId, !seats, !Array.isArray(seats));
    const username = req.username;

    if( !Array.isArray(seats) || !seats?.length ){
        return res.status(400).json({message : "All field are require"})
    }
    const user = await Users.findOne({username})
    if(!user){
        res.status(400).json({message: "Unauthorized"});
    }

    const ticket = await Tickets.create({userId : user._id, showsId, seats})
    if(!ticket){
        return res.status(400).json({message: "tickets dose't booked"})
    }
    let updateshow = await Shows.findByIdAndUpdate(showsId);
    updateshow.bookedseats.push({
        $each : seats,
        $position: 0
    });
    await updateshow.save()
    console.log("successfull");
    res.status(200).json({message: "Ticket Booked Successfully", ticket})

})

// User can Delete Ticket 
// Delete

const deleteTickets = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const ticket = await Tickets.findByIdAndDelete(id);
    if(!ticket){
        return res.status(400).json({message: "This ticket id is Wrong"});
    }
    console.log(ticket.seats, ticket.showsId);
    const seats = ticket.seats;

    const shows = await Shows.findByIdAndUpdate(ticket.showsId);

    seats.map( i => {
        shows.bookedseats.pull(i)
        
    })
    await shows.save();

    res.status(200).json({message: "Tickets Deleted Successfully", shows});
})
// Get single Ticket
// Read

const getTicket = asyncHandler(async(req, res) => {

    const { id } = req.params;

    const ticket = await Tickets.findById(id);

    const user = await Users.findById(ticket.userId);

    const show = await Shows.findById(ticket.showsId)
    const movie = await Movies.findById(show.movie);
    //console.log(movie);

    res.status(200).json({Id: ticket._id, Price: show.price, image: movie.imageurl, username: user.username, showdate: show.dateforshow, Batch: show.batch, MovieName: movie.movieName, Seats: ticket.seats})

})

// get all tickets
// Read

const getalltickets = asyncHandler(async (req, res) => {

    const username = req.username;
    console.log("nothing : ",username);
    const user = await Users.findOne({username})
    console.log("nothing",user);


    const tickets = await Tickets.find({userId: user._id});

    res.json(tickets)
})

const getpdftickets = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const ticket = await Tickets.findById(id);

    const user = await Users.findById(ticket.userId);

    const show = await Shows.findById(ticket.showsId)
    const movie = await Movies.findById(show.movie);
    //console.log(movie);

    const pdfData = {
        Id: ticket._id, 
        Price: show.price, 
        image: movie.imageurl, 
        username: user.username, 
        showdate: show.dateforshow, 
        Batch: show.batch, 
        MovieName: movie.movieName, 
        Seats: ticket.seats
    }

})


module.exports = { bookTicket, deleteTickets, getTicket, getalltickets, getpdftickets };

