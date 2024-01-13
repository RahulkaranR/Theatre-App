const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Users = require("../module/Users");
const { json2csv } = require("json-2-csv")

// Create New User
// Create
const createUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {
        firstname,
        lastname,
        username,
        password,
        email,
        sex,
        dateofbirth
    } = req.body;

    if (!firstname || !lastname || !username || !password || !email || !sex || !dateofbirth){
        return res.status(200).json({message: "All fields are require"})
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const duplicate = await Users.findOne({username});

    if(duplicate){
        return res.status(200).json({message: "Username already Exist"});
    }

    const user = await Users.create({ username, firstname, lastname, password : hashpassword, sex, dateofbirth, email  })
    res.status(200).json({ message: "User is Created Successfully" })
    
})


// Update Existing User
// Update
const updateUser = asyncHandler( async (req, res) => {
    const {
        firstname,
        lastname,
        username,
        password,
        email,
        sex,
        dateofbirth
    } = req.body;
    if(!firstname && !lastname && !username && !password && !email && !sex && dateofbirth){
        console.log("some field is updated");
        return res.status(400).json({message: "Pleas Update any of the field"})
        
    }
    console.log({
        "fN": firstname,
        "LN": lastname,
        "UN": username,
        "EM": email,
        "PW": password,
        "SX": sex,
        "DOB": dateofbirth

});
    const { id } = req.params;
    console.log(id);


    let user = await Users.findById(id);

    if(username){
        const duplecateusername = await Users.findOne({username});
        if(duplecateusername){
            console.log("Duplicate Id", duplecateusername);
            if(duplecateusername._id.toString() !== id.toString()){
                return res.status(400).json({message: "Username Taken please Enter another One"})
            }
            user.username = username || user.username
    }
    }

    if(!user){
        return res.status(200).json({message: "User Does not Exist"})
    }

    if(password){
        const hashpassword = await bcrypt.hash(password, 10);
        user.password = hashpassword 
    }

    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.email = email || user.email;
    user.sex = sex || user.sex;
    user.dateofbirth = dateofbirth || user.dateofbirth

    await user.save()

    res.status(200).json({message: "User Updated Successfully "})

} )

// delete Existing User
// Delete

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await Users.findById(id)

    if(!user){
        return res.status(200).json({message: "User does not Exist"})
    }

    user.active = false;

    await user.save()

    res.status(200).json({message: "User Deleted Successfully"});
    
})

// get all Users
// Read
const selectallusers = asyncHandler(async (req, res) => {
    const users = await Users.find()

    res.status(200).json(users);
})


const download_CSV = asyncHandler(async (req, res) => {

})



// Whole crud Operations
module.exports = { createUser, updateUser, deleteUser, selectallusers };

