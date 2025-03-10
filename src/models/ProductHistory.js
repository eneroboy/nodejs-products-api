const mongoose = require('mongoose');

const productHistorySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  change: {
    type: String,
    enum: ['create', 'update', 'delete'],
    required: true
  },
  oldData: {
    type: Object
  },
  newData: {
    type: Object
  },
  changeDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ProductHistory', productHistorySchema);
