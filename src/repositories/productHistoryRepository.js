const ProductHistory = require('../models/ProductHistory');

const createHistoryRecord = async (record) => {
  const history = new ProductHistory(record);
  return await history.save();
};

module.exports = {
  createHistoryRecord
};
