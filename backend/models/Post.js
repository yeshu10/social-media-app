const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who created the post
  content: { type: String, required: true }, // Post content
  image: { type: String }, // Optional image URL
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who liked the post
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User who commented
      text: { type: String, required: true }, // Comment text
      date: { type: Date, default: Date.now }, // Comment date
    },
  ],
  date: { type: Date, default: Date.now }, // Post creation date
});

module.exports = mongoose.model('Post', postSchema);