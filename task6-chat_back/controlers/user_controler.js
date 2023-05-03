const asyncHandler = require("express-async-handler");
// It essentially removes the need for repetitive try-catch blocks in your route handlers.

const User = require("../Models/userModel");

const generateToken = require("../config/generateToken");



const registerUser = async (req, res) => {
  const { name, email, password, pic } = req.body;
  // We are using req.body to extract the values from the form.

  if (!name ) {
    res.status(400);
    // status sets the HTTP code to 400.
    throw new Error("Please fill in name.");
    // It will stop executing the code and throw the error.
  }
  if ( !email)  {
    res.status(400);
    // status sets the HTTP code to 400.
    throw new Error("Please fill in all required email.");
    // It will stop executing the code and throw the error.
  }
  if ( !password) {
    res.status(400);
    // status sets the HTTP code to 400.
    throw new Error("Please fill in all required password.");
    // It will stop executing the code and throw the error.
  }

  // Check if user already exists.
  const userExists = await User.findOne({ email });
  // find one is a query used in mongoo
  if (userExists) {
    res.status(400);
    throw new Error("You already have an account. Please check our help section for more information.");
  }

  // If user doesn't exist, create a new user in the database.
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  // If user was added successfully, log its information to the console.
  if (user) {
    res.status(201/* means "created" */).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token : generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found or not added. Please check your user control.");
  }
};

const authUser = asyncHandler(async(req,res)=> 
{
  console.log("login ")
  const{email, password} = req.body;
  const user = await User.findOne ({email})
  // if user is found and the password is matching the one we have in our database
  
  if (user && (await user.matchPassword(password)))
  // user not User cuz we r taken it from the return value of user
   {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token : generateToken(user._id),

    })
    
  }if (!user){
    res.status(400);
    throw new Error("user not found ya3ni mail not found")
  }
  if(!(await user.matchPassword(password))){
    //matchPassword defined f user model
    res.status(400);
    throw new Error("password is wrong")
  }

}
)
//queries??
//sending our data to the back-end 
//exemple => route : api/user?search=omar2
const allUsers=asyncHandler(async (req, res ) => 
{
  //how we r taking the search variable from the queries
  const keyword = req.query.search /* if there's any query inside of it*/
  ?{
    //the $or operator is used to search for documents that match either the name or email fields with a case-insensitive regular expression
    $or:
    [
      //searching ether inside of the mail or the name 
      //if one of them match its gonna return it 
      {name : {$regex : req.query.search , $options : "i"/* check documentation ta3 mongo*/}},
      {email : {$regex : req.query.search , $options : "i"}}
    ]
  }
  : {}
   const users =await User.find(keyword)
console.log(keyword)
res.send(users)

})



module.exports = { registerUser , authUser , allUsers };
