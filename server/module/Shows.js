
const mongoose = require("mongoose");


const ShowsSchema = mongoose.Schema({
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
    dateforshow :{
        type: Date,
        required: true,
    },
    batch: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 100
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
    bookedseats: {
        type: [Number],
        default: []
    }
},
{
    timestamps: true,
}
)


const Shows = mongoose.model("Shows", ShowsSchema);


module.exports = Shows;

