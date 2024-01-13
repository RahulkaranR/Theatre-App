
const Users = require("../module/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const login = asyncHandler(async(req, res) => {
    const { username, password } = req.body;

    if(!username || !password){
        res.status(400).json({message: "All Field are required"});
    }
    console.log(username, password);

    const foundUser = await Users.findOne({username}).exec()
    if(!foundUser){
        res.status(400).json({message:"NO user Found"})
    }

    const match = await bcrypt.compare(password, foundUser.password)

    if(!match) return res.status(400).json({message: "Unauthorize"});

    const accessToken = jwt.sign(
        {
            "UserInfo":{
                "username": foundUser.username,
                "roles": foundUser.roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "120s"}
    )

    const refreshToken = jwt.sign(
        {"username": foundUser.username},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: "1h"}
    )

    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: false,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({accessToken})
    
})

const refresh = asyncHandler(async(req, res) => {

    const cookies = req.cookies
    console.log(cookies);

    if(!cookies?.jwt) return res.status(400).json({ message: "Unauthorize first"})

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async(err, decoded) => {
            if(err) return res.status(403).json({message: "Forbidded"});

            const foundUser = await Users.findOne({username: decoded.username})

            if(!foundUser) res.status(400).json({message: "Unauthorize"})

            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        username: foundUser.username,
                        roles: foundUser.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "20s"}

            )

            res.json({ accessToken })
        }
        
    )
})

const logout = asyncHandler(async(req, res) => {
    const cookies = req.cookies
    console.log("cookies",cookies);
    if(!cookies?.jwt) return res.status(204)
    res.clearCookie("jwt", {httpOnly: true, sameSite: "None", secure: true})
    res.json({ message: "Cookie cleared" })
})

module.exports = { login, refresh, logout }



