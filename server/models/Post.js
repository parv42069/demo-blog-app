const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  genre: {
    type: String,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
});

module.exports = mongoose.model('Post', PostSchema);
