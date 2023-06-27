import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minLength: 3,
    maxLength: 120,
    trim: true
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email"
    }
  },
  password: {
    type: String,
    required: [true, "Please provide email"],
    minLength: 6,
    select: false
  },
  lastName: {
    type: String,
    minLength: 3,
    maxLength: 120,
    trim: true,
    default: "Last name"
  },
  location: {
    type: String,
    minLength: 3,
    maxLength: 120,
    trim: true,
    default: "My city"
  }
});

userSchema.pre("save", async function(){
  if( !this.isModified('password') ) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
});

userSchema.methods.comparePasswords = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password) 
}

userSchema.methods.createJWT = function(){
  return jwt.sign({userId: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
}

export const User = mongoose.model('User', userSchema);