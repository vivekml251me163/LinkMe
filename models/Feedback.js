import mongoose from 'mongoose'

const FeedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  rating: Number,
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema)
