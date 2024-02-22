const jwt= require("jsonwebtoken");
const jwtSecret = "sumsum"

const generateToken = (payLoad) =>{
    const token = jwt.sign(payLoad, jwtSecret, {expiresIn: "1h"}
    )
    return token
}

const verifyToken = (token) =>{
    const payLoad = jwt.verify(token, jwtSecret);
    console.log(payLoad);
    return payLoad 
}

module.exports = {
    generateToken, verifyToken
}