const jwt = require('jsonwebtoken')
const generateTokenAndSetCookies = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,//prevent Xss attacks,
        sameSite: "strict",//CSRF attack prevents
        secure: process.env.NODE_ENV !== 'development'
    })
}
module.exports = generateTokenAndSetCookies;