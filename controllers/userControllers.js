import User from "../models/User.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  const { email, password, firstName, lastName, mobile, city, country } =
    req.body;

  if (
    !email ||
    !password ||
    !firstName ||
    !lastName ||
    !mobile ||
    !city ||
    !country
  ) {
    return res.status(400).json({ msg: "Please provide all the fields" });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ msg: "User already exists" });
  }

  const user = await User.create({
    email,
    password,
    firstName,
    lastName,
    mobile,
    city,
    country,
  });
  const token = user.createJWT();

  return res.status(200).json({
    user: {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      mobile: user.mobile,
      city: user.city,
      country: user.country,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please provide all the fields" });
  }
  const user = await User.findOne({ email }).select("password");
  if (!user) {
    return res.status(400).json({ msg: "user not registered" });
  }
  console.log(user.password,password);
  const token = user.createJWT();
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(400).json({ msg: "Invalid password" });
  }
  res.status(200).json({ user, token });
};
const getUser = async (req, res) => {
  const user = await User.find({ _id: req.user.userId });
  console.log(user);
  return res.status(200).json({ user });
};


const updateUser = async (req, res) => {
  const { email,mobile, firstName,lastName,city ,country} = req.body
  if (!email || !mobile || !lastName || !firstName || !city || !country) {
    res.status(400).json({msg:"all fields required"})
  }

  const user = await User.findOne({ _id: req.user.userId })

  user.email = email
  user.mobile= mobile
  user.lastName=lastName
  user.firstName=firstName
  user.city= city
  user.country= country

  const updatedData= await user.save()

  // various setups
  // in this case only id
  // if other properties included, must re-generate
  res.status(200).json({updatedData});
}

export { register, login, getUser, updateUser};
