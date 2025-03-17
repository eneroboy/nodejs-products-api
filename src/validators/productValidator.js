const productRepository = require('../repositories/productRepository');
const settingsRepository = require('../repositories/settingsRepository');

const getSettings = async () => {
  let settings = await settingsRepository.getSettings();
  if (!settings) {
    settings = await settingsRepository.createSettings({});
  }
  return settings;
};

const strategies = {
  forbiddenPhrase: async (data) => {
    const { forbiddenPhrases } = await getSettings();
    if (data.name && forbiddenPhrases.some(phrase => data.name.toLowerCase().includes(phrase.toLowerCase()))) {
      return 'Nazwa produktu zawiera niedozwoloną frazę';
    }
    return null;
  },
  nameLength: (data) => {
    if (data.name && (data.name.length < 3 || data.name.length > 20)) {
      return 'Nazwa produktu musi mieć od 3 do 20 znaków';
    }
    return null;
  },
  nameAlphanumeric: (data) => {
    if (data.name && !/^[A-Za-z0-9]+$/.test(data.name)) {
      return 'Nazwa produktu może zawierać tylko litery i cyfry';
    }
    return null;
  },
  categoryValidation: async (data) => {
      const { allowedCategories } = await getSettings();  
    if (data.category && !allowedCategories.includes(data.category)) {
      return `Kategoria musi być jedną z: ${allowedCategories.join(', ')}`;
    }
    return null;
  },
  priceValidation: async (data) => {
    const { priceLimits } = await getSettings();
    if (data.price != null && data.category && priceLimits.get(data.category)) {
      const { min, max } = priceLimits.get(data.category);
      if (data.price < min || data.price > max) {
        return `Cena musi być w zakresie od ${min} do ${max}, ty podałeś: ${data.price}`;
      }
    }
    return null;
  },
  quantityValidation: (data) => {
    if (data.quantity != null) {
      if (!Number.isInteger(data.quantity)) {
        return 'Ilość musi być liczbą całkowitą';
      }
      if (data.quantity < 0) {
        return 'Ilość nie może być ujemna';
      }
    }
    return null;
  },
  uniqueName: async (data, options = {}) => {
    if (data.name) {
      const existing = await productRepository.getProductByName(data.name);
      if (existing && (!options.currentProductId || existing._id.toString() !== options.currentProductId)) {
        return 'Produkt o podanej nazwie już istnieje';
      }
    }
    return null;
  }
};

const validateProduct = async (data, options = {}) => {
    const errors = [];
    const validations = Object.keys(strategies).map(key => {
      const fn = strategies[key];
      return Promise.resolve(fn(data, options));
    });
    const results = await Promise.all(validations);
    results.forEach(result => {
      if (result) {
        errors.push(result);
      }
    });
    if (errors.length) {
      throw { status: 400, message: errors.join('; ') };
    }
  };

module.exports = {
  validateProduct
};