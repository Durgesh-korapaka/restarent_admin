const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await MenuItem.deleteMany();
    await Order.deleteMany();

  const menuItems = await MenuItem.insertMany([
  {
    name: 'Chicken Biryani',
    category: 'Main Course',
    price: 250,
    ingredients: ['chicken', 'rice', 'spices'],
    preparationTime: 20
  },
  {
    name: 'Mutton Biryani',
    category: 'Main Course',
    price: 320,
    ingredients: ['mutton', 'rice', 'spices'],
    preparationTime: 25
  },
  {
    name: 'Paneer Butter Masala',
    category: 'Main Course',
    price: 220,
    ingredients: ['paneer', 'butter', 'tomato']
  },
  {
    name: 'Veg Fried Rice',
    category: 'Main Course',
    price: 180,
    ingredients: ['rice', 'vegetables', 'soy sauce']
  },
  {
    name: 'Chicken 65',
    category: 'Appetizer',
    price: 180,
    ingredients: ['chicken', 'chili', 'spices']
  },
  {
    name: 'Veg Manchurian',
    category: 'Appetizer',
    price: 150,
    ingredients: ['vegetables', 'soy sauce']
  },
  {
    name: 'Spring Rolls',
    category: 'Appetizer',
    price: 140,
    ingredients: ['vegetables', 'wrapper']
  },
  {
    name: 'Gulab Jamun',
    category: 'Dessert',
    price: 90,
    ingredients: ['milk solids', 'sugar syrup']
  },
  {
    name: 'Ice Cream',
    category: 'Dessert',
    price: 100,
    ingredients: ['milk', 'sugar']
  },
  {
    name: 'Brownie',
    category: 'Dessert',
    price: 120,
    ingredients: ['chocolate', 'flour']
  },
  {
    name: 'Coke',
    category: 'Beverage',
    price: 50,
    ingredients: ['carbonated water']
  },
  {
    name: 'Sprite',
    category: 'Beverage',
    price: 50,
    ingredients: ['carbonated water']
  },
  {
    name: 'Lime Soda',
    category: 'Beverage',
    price: 60,
    ingredients: ['lemon', 'soda']
  },
  {
    name: 'Masala Dosa',
    category: 'Main Course',
    price: 120,
    ingredients: ['rice batter', 'potato']
  },
  {
    name: 'Idli Vada',
    category: 'Main Course',
    price: 100,
    ingredients: ['rice batter', 'lentils']
  }
]);


    await Order.insertMany([
      {
        orderNumber: 'ORD-1001',
        items: [
          {
            menuItem: menuItems[0]._id,
            quantity: 1,
            price: 250
          }
        ],
        totalAmount: 250,
        customerName: 'Ravi',
        tableNumber: 5,
        status: 'Pending'
      }
    ]);

    console.log('Seed data inserted successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
