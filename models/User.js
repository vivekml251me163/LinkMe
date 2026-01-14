import mongoose from "mongoose"

const LinkSchema = new mongoose.Schema({
  title: String,
  url: String,
  icon: String,
  active: Boolean,
})

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  name: String,
  avatar: String,
  links: [LinkSchema],
})

export default mongoose.models.User || mongoose.model("User", UserSchema)
