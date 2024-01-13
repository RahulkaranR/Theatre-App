const mongoose = require("mongoose");


const UsersSchema = mongoose.Schema({
    roles: {
        type: [String],
        default: ["User"]
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        required: true,
        default: "male"
    },
    dateofbirth: {
        type: Date,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
},
{
    timestamps: true,
}
)

const Users = mongoose.model("Users", UsersSchema);


module.exports = Users;



