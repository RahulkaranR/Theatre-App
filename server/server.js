const express = require("express");
const connectDB = require("./config/dbconnect");
require("dotenv").config();
const cookieParser = require('cookie-parser')
const mongoose  = require("mongoose");
const cors = require("cors");
const coresOptions = require("./config/coresOptions")

const PORT = process.env.PORT || 5000
const app = express()

connectDB();


app.use(cookieParser())
app.use(cors(coresOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.get("/",(req, res) => {
    res.status(200).json({message : "this is Enough"})
})


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/usersRoutes"));
app.use("/api/movies", require("./routes/moviesRoutes"));
app.use("/api/shows", require("./routes/showRoutes"));
app.use("/api/ticket", require("./routes/ticketRoutes"));


mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))
})

mongoose.connection.on("error", (err) => {
    console.log(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`);
})

