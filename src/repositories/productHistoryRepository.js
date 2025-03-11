const ProductHistory = require('../models/ProductHistory');

const createHistoryRecord = async (record) => {
  const history = new ProductHistory(record);
  return await history.save();
};

const getHistoryByProductId = async (productId) => {
  return await ProductHistory.find({ productId }).sort({ changeDate: -1 });
};

module.exports = {
  createHistoryRecord,
  getHistoryByProductId
};