const mongoose = require('mongoose');

const allowedCategories = ['electronics', 'books', 'clothing'];

const priceLimits = {
  electronics: { min: 50, max: 50000 },
  books: { min: 5, max: 500 },
  clothing: { min: 10, max: 5000 }
};

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, 'Nazwa musi mieć co najmniej 3 znaki'],
    maxlength: [20, 'Nazwa może mieć maksymalnie 20 znaków'],
    match: [/^[A-Za-z0-9]+$/, 'Nazwa może zawierać tylko litery i cyfry']
  },
  category: {
    type: String,
    required: true,
    enum: {
      values: allowedCategories,
      message: 'Kategoria musi być jedną z: electronics, books, clothing'
    }
  },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        if (this.category && priceLimits[this.category]) {
          return value >= priceLimits[this.category].min && value <= priceLimits[this.category].max;
        }
        return true;
      },
      message: props => `Cena musi być w zakresie dla kategorii ${props.value}`
    }
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, 'Ilość nie może być ujemna'],
    validate: {
      validator: Number.isInteger,
      message: 'Ilość musi być liczbą całkowitą'
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
