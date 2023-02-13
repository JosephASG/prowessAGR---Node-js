import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//for create Table into DB for User
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, //only one email
    password: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    image: {
      public_id: { type: String },
      secure_url: { type: String },
    },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true, //for date
    versionKey: false, //for version
  }
);

// Create a method called encryptPassword that takes in a password, hashes it, and returns the hashed password.
UserSchema.methods.encrypPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Create a method called matchPassword that takes in a password and checks if it matches the password in the database.
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);
export default User;
