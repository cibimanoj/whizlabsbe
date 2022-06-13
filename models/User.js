import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide email"],
        validate: {
          validator: validator.isEmail,
          message: "Please provide a valid email",
        },
        unique: true,
      },
      password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 6,
        select: false,
      },
      mobile: {
        type: Number,
        required:[true,"Please provide mobile number "],
        trim: true,
        maxlength: 10,
      },
      firstName: {
        type: String,
        required:[true, "Please provide first name"],
        trim: true,
        maxlength: 20,
      },
      lastName: {
        type: String,
        trim: true,
        required:[true, "Please provide first name"],
        maxlength: 20,
      },
      city: {
        type:"string",
        required:[true,"Please provide your city "],
        trim: true,
        maxlength: 10,
      },
      country:{
          type: String,
          required:[true,"Please provide your country "],
          trim: true,
          maxlength: 20
      }  
})

userSchema.pre("save" ,async function(){
    if(!this.isModified("password")) return
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})
userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};
export default mongoose.model("User", userSchema);