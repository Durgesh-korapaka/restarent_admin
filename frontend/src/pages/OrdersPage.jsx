import { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus } from '../api/api';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [status]);

  const fetchOrders = async () => {
    const query = status ? `?status=${status}` : '';
    const data = await getOrders(query);
    setOrders(data);
  };

  const handleChange = async (id, value) => {
    await updateOrderStatus(id, value);
    fetchOrders();
  };

  return (
    <div className="container card">
      <h2>🧾 Orders Dashboard</h2>

      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        style={{ marginBottom: '15px' }}
      >
        <option value="">All Orders</option>
        <option>Pending</option>
        <option>Preparing</option>
        <option>Ready</option>
        <option>Delivered</option>
        <option>Cancelled</option>
      </select>

      {orders.map(order => (
        <div
          key={order._id}
          style={{
            borderBottom: '1px solid #eee',
            paddingBottom: '10px',
            marginBottom: '10px'
          }}
        >
          <p><b>{order.orderNumber}</b> — ₹{order.totalAmount}</p>
          <p>Customer: {order.customerName || 'N/A'}</p>

          <select
            value={order.status}
            onChange={e => handleChange(order._id, e.target.value)}
          >
            <option>Pending</option>
            <option>Preparing</option>
            <option>Ready</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
