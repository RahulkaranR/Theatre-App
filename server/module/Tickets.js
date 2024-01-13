const mongoose = require("mongoose");

const TicketsSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    
    showsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shows",
        required: true,
    },
    seats : {
        type: [Number],
        required: true,
        default: []
    }
},
{
    timestamps: true,
}
)

const Tickets = mongoose.model("Tickets", TicketsSchema);

module.exports = Tickets;

// showsbydateId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Showsbydate",
    //     required: true
    // },
