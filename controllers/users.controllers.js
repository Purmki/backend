const {User} = require("../models/users.models")
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");


const register = async (req, res) => {
  const body = req.body;
  const hash = await bcrypt.hash(body.password, 10);
  body.password = hash;
  try {
    const user = new User(body);
    user.id = user._id;
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = generateToken({
          id: user._id,
          email: user.email
        });
        return res.send({ user, token });
      } else {
        return res.status(401).send({ message: "wrong password or email" });
      }
    } else {
      res.status(401).send({ message: "wrong email or password" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const updateUsers = async (req, res) => {
  const body = req.body;
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, body, { new: true });
    res.send(user);
  } catch (error) {
    res.status(400).send("error");
  }
};

const getUserById = async (req,res)=>{
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.send(user);
    
  } catch (error) {
    res.status(400).send("error");
  }
}



const deleteUsers = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.send("deleted successfully");
  } catch (error) {
    res.status(400).send("error");
  }
};

module.exports = {register, login, getUsers, updateUsers, deleteUsers, getUserById}
