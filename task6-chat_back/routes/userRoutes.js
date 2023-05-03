const express = require('express');
const router = express.Router();

const { registerUser, authUser, allUsers } = require("../controlers/user_controler");




//home page
router.post('/', registerUser);
router.get('/', /*protect,*/ allUsers);
//creating the user searching api endpoint*/;

router.post('/login', authUser);





router.get('/', (req, res) => {
  res.send("API user ye5dem on 5000");
});

module.exports = router;
