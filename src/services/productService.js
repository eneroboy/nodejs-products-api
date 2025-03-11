const productRepository = require('../repositories/productRepository');
const productHistoryRepository = require('../repositories/productHistoryRepository');

let forbiddenPhrases = ['test', 'demo'];

const containsForbiddenPhrase = (name) => {
  return forbiddenPhrases.some(phrase => name.toLowerCase().includes(phrase.toLowerCase()));
};

const getAllProducts = async () => {
  return await productRepository.getAllProducts();
};

const getProductById = async (id) => {
  const product = await productRepository.getProductById(id);
  if (!product) {
    throw { status: 404, message: 'Produkt nie znaleziony' };
  }
  return product;
};

const createProduct = async (data) => {
  if (containsForbiddenPhrase(data.name)) {
    throw { status: 400, message: 'Nazwa zawiera zabronioną frazę' };
  }
  const product = await productRepository.createProduct(data);
  await productHistoryRepository.createHistoryRecord({
    productId: product._id,
    change: 'create',
    newData: product.toObject()
  });
  return product;
};

const updateProduct = async (id, data) => {
  if (data.name && containsForbiddenPhrase(data.name)) {
    throw { status: 400, message: 'Nazwa zawiera zabronioną frazę' };
  }
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
  deleteProduct,

  addForbiddenPhrase: (phrase) => { forbiddenPhrases.push(phrase); },
  removeForbiddenPhrase: (phrase) => {
    forbiddenPhrases = forbiddenPhrases.filter(p => p !== phrase);
  }
};
