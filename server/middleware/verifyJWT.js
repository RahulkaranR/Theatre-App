const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler")

const verifyJWT = asyncHandler(async(req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if(!authHeader?.startsWith("Bearer ")){
        console.log("token is not hear ");
        return res.status(403).json({message: "Unauthorized one"})
    }
    const token = authHeader.split(" ")[1]
    

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.status(403).json({ message: "Forbidden TE" })
            req.username = decoded.UserInfo.username
            req.roles = decoded.UserInfo.roles
            next();
        }
    )
})

module.exports = verifyJWT

