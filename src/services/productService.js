const productRepository = require('../repositories/productRepository');
const productHistoryRepository = require('../repositories/productHistoryRepository');
const { validateProduct } = require('../validators/productValidator');

const getAllProducts = async () => {
  return await productRepository.getAllProducts();
};

const getProductById = async (id) => {
  const product = await productRepository.getProductById(id);
  if (!product) {
    throw { status: 404, message: 'Produkt nie znaleziony' };
  }
  const history = await productHistoryRepository.getHistoryByProductId(product._id);
  return { ...product.toObject(), history };
};

const createProduct = async (data) => {
  await validateProduct(data);
  const product = await productRepository.createProduct(data);
  await productHistoryRepository.createHistoryRecord({
    productId: product._id,
    change: 'create',
    newData: product.toObject()
  });
  return product;
};

const updateProduct = async (id, data) => {
  await validateProduct(data, { currentProductId: id });
  const existingProduct = await productRepository.getProductById(id);
  if (!existingProduct) {
    throw { status: 404, message: 'Produkt nie znaleziony' };
  }
  await productHistoryRepository.createHistoryRecord({
    productId: existingProduct._id,
    change: 'update',
    oldData: existingProduct.toObject(),
    newData: data
  });
  const updatedProduct = await productRepository.updateProduct(id, data);
  return updatedProduct;
};

const deleteProduct = async (id) => {
  const existingProduct = await productRepository.getProductById(id);
  if (!existingProduct) {
    throw { status: 404, message: 'Produkt nie znaleziony' };
  }

  await productHistoryRepository.createHistoryRecord({
    productId: existingProduct._id,
    change: 'delete',
    oldData: existingProduct.toObject()
  });
  return await productRepository.deleteProduct(id);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
