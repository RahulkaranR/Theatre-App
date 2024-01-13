const mongoose = require("mongoose");


const MoviesSchema = mongoose.Schema({
    movieName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    imageurl:{
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 7.5
    },
    movietype: {
        type: [String],
        required: true,
        default: [],
    },
    language: {
        type : String,
        default: "Tamil"
    }
},
{
    timestamps: true,
}
)


const Movies = mongoose.model("Movies", MoviesSchema);


module.exports = Movies;


