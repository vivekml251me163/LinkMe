import mongoose from 'mongoose'

const SuggestionSchema = new mongoose.Schema({
  name: String,
  email: String,
  title: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Suggestion || mongoose.model('Suggestion', SuggestionSchema)
