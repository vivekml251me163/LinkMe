import mongoose from 'mongoose'

const AskSchema = new mongoose.Schema({
  name: String,
  email: String,
  category: String,
  question: String,
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Ask || mongoose.model('Ask', AskSchema)
