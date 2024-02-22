const { Router } = require("express");
const { register, login, getUsers, updateUsers, deleteUsers, getUserById } = require("../controllers/users.controllers");
const { auth } = require("../middleware/auth");
const router = Router();

router.post("/register", register) 
router.post("/login", login)
router.get("/", getUsers)
router.patch("/:id", updateUsers)
router.delete("/:id", deleteUsers)
router.get("/tokenKeeper",auth, (req,res)=>{
    const user= req.user
    res.send(user)
})

module.exports = router