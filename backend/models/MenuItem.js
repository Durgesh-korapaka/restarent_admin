const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true, // for search
      trim: true
    },

    description: {
      type: String
    },

    category: {
      type: String,
      required: true,
      enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage']
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    ingredients: [
      {
        type: String,
        trim: true
      }
    ],

    isAvailable: {
      type: Boolean,
      default: true
    },

    preparationTime: {
      type: Number // minutes
    },

    imageUrl: {
      type: String
    }
  },
  {
    timestamps: true // createdAt, updatedAt
  }
);

// TEXT SEARCH (important for search API)
menuItemSchema.index({
  name: 'text',
  ingredients: 'text'
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
