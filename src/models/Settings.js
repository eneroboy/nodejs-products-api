const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: 'singleton'
  },
  allowedCategories: {
    type: [String],
    default: ['electronics', 'books', 'clothing']
  },
  forbiddenPhrases: {
    type: [String],
    default: ['test', 'demo', 'blocked']
  },
  priceLimits: {
    type: Map,
    of: new mongoose.Schema({
      min: Number,
      max: Number
    }),
    default: {
      electronics: { min: 50, max: 50000 },
      books: { min: 5, max: 500 },
      clothing: { min: 10, max: 5000 }
    }
  }
});

module.exports = mongoose.model('Settings', settingsSchema);