const jwt= require("jsonwebtoken");


const generateToken = (id) =>{
    return jwt.sign({id}, "omar2",
        { expiresIn : "120d" ,});

};
module.exports= generateToken;