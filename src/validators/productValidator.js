const allowedCategories = ['electronics', 'books', 'clothing'];

let forbiddenPhrases = ['test', 'demo'];

const priceLimits = {
  electronics: { min: 50, max: 50000 },
  books: { min: 5, max: 500 },
  clothing: { min: 10, max: 5000 }
};

const strategies = {
  forbiddenPhrase: (data) => {
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
  categoryValidation: (data) => {
    if (data.category && !allowedCategories.includes(data.category)) {
      return `Kategoria musi być jedną z: ${allowedCategories.join(', ')}`;
    }
    return null;
  },
  priceValidation: (data) => {
    if (data.price != null && data.category && priceLimits[data.category]) {
      const { min, max } = priceLimits[data.category];
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
  }
};

const validateProduct = (data) => {
  const errors = [];
  Object.values(strategies).forEach(fn => {
    const error = fn(data);
    if (error) {
      errors.push(error);
    }
  });
  if (errors.length) {
    throw { status: 400, message: errors.join('; ') };
  }
};

module.exports = {
  validateProduct
};