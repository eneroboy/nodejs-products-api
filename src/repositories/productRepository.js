const Product = require('../models/Product');

const getAllProducts = async () => {
  return await Product.find({}, 'name price');
};

const getProductById = async (id) => {
  return await Product.findById(id);
};

const createProduct = async (data) => {
  const product = new Product(data);
  return await product.save();
};

const updateProduct = async (id, data) => {
  const product = await Product.findById(id);
  if (!product) {
    return null;
  }
  product.set(data);
  return await product.save();
};

const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
