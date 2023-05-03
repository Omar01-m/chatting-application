 // structering the data models (how would the data would be stired in our data base) 


 const { default: mongoose } = require("mongoose");

 const bcrypt = require('bcryptjs')
 const userSchema= mongoose.Schema({
     name :
      { 
        type : String ,
         required: true
        },
     email :
      { 
        type : String ,
         required: true,
         unique : true /*kima l primary key*/
        },
     password :
      { type : String ,
         required: true
        },
        //they can't be empty
        pic :
        {
            type : String ,
            default:"https://icons8.com/icon/tZuAOUGm9AuS/user-default"
        },

 },
 {
     timestamps: true,
 }
 
 
 
 )
// we won't store our password in a normal format we want it to be encrypted

//pre means befor saving
userSchema.pre("save" , async function(next){
    if (! this.isModified)
    {next()}
    //moving to the next code
    const salt = await bcrypt.genSalt(8);
    this.password= await bcrypt.hash(this.password, salt )

})
userSchema.methods.matchPassword = async function (entreredPassword) {
    console.log('entered password:', entreredPassword);
  console.log('hashed password:', this.password);
    return await bcrypt.compare(entreredPassword, this.password)
}




  const User = mongoose.model("User", userSchema)
 
  module.exports = User
  