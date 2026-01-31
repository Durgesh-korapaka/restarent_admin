const Order = require('../models/Order');

// GET /api/orders
exports.getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 5 } = req.query;

    let filter = {};
    if (status) filter.status = status;

    const orders = await Order.find(filter)
      .populate('items.menuItem')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/orders/:id
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.menuItem');

    if (!order)
      return res.status(404).json({ message: 'Order not found' });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const orderNumber = `ORD-${Date.now()}`;

    const order = new Order({
      ...req.body,
      orderNumber
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PATCH /api/orders/:id/status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order)
      return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
