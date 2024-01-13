const asyncHandler = require("express-async-handler")
const Movies = require("../module/Movies");
// Read
// get all created movies
const getAllMovies = asyncHandler(async (req, res) => {
    const movies = await Movies.find();
    console.log(req.username, req.roles);

    res.status(200).json(movies)
})
// Read 
// get single movie using id in params
const getSingleMovie = asyncHandler(async (req, res) => {

    const { id } = req.params;
    console.log(id);

    const movie = await Movies.findById(id)

    if(!movie){
        return res.status(400).json({message: "Movie does not exist"});
    }

    res.status(200).json({movie});

})
// Create 
// Admi Created the new Movie
const createMovie = asyncHandler(async (req, res) => {
    
    const { movieName, title, subtitle, imageurl, rating, movietype, language } = req.body;
    console.log(req.body);

    if(!movieName || !title || !subtitle || !imageurl || !movietype ){
        return res.status(400).json({ message : "All fields are require"})
    }

    const newMovie = await Movies.create({ movieName, title, subtitle, imageurl, rating, movietype, language }) 

    res.status(200).json({message: "movie created Successfully", newMovie})
})

// Update 
// Admin can update the created Movie

const UpdateMovie = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { movieName, title, subtitle, imageurl, rating, movietype, language } = req.body;

    let movie = await Movies.findByIdAndUpdate(id)

    if(!movie){
        return res.status(400).json({message: "Movie does not Exist"});
    }

    movie.movieName = movieName || movie.movieName;
    movie.title = title || movie.title;
    movie.subtitle = subtitle || movie.subtitle;
    movie.imageurl = imageurl || movie.imageurl;
    movie.rating = rating || movie.rating;
    movie.movietype = movietype || movie.movietype;
    movie.language = language || movie.language;

    await movie.save()

    res.status(200).json({message: "Movie Updated Successfully"})

})

// Delete
// Admin can delete created movie

const deleteMovie = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const movie = await Movies.findByIdAndDelete(id);
    
    if(!movie){
        return res.status(200).json({message : "Movies Does not Exist"});
    }

    res.status(200).json({message: "Movie Deleted Successfullly", movie})

})

// whole crud operation

module.exports = { getAllMovies, getSingleMovie, createMovie, UpdateMovie, deleteMovie };


