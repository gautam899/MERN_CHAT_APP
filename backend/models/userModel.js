import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true},
    password: { type: String, required: true },
    pic: {
      type: String,
      required:true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.pre("save", async function (next) {
  //If the password is already modified then we do nothing else we need to encrypt the password since we do not want to store the passowrdin the plain state.
  if (!this.isModified('password')) {    
     next();
     return;     
  }
  //First we will generate a salt of 10.The higher the number the stronger is the password
  const salt = await bcrypt.genSalt(10);
  //Now we will hash the password using the bcrpyt dependency
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// Now let's create a model for it
const User = mongoose.model("User", userSchema);

export default User;
//The three models that we have created i.e the chat model, message model, and usermodel will tell the mongoose how to structure the data.
