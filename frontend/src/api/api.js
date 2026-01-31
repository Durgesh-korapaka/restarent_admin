const API_BASE_URL = 'http://localhost:5000';

export const getMenuItems = async (params = '') => {
  const res = await fetch(`${API_BASE_URL}/api/menu${params}`);
  return res.json();
};

export const searchMenuItems = async (query) => {
  const res = await fetch(
    `${API_BASE_URL}/api/menu/search?q=${encodeURIComponent(query)}`
  );
  return res.json();
};

export const toggleAvailability = async (id) => {
  const res = await fetch(
    `${API_BASE_URL}/api/menu/${id}/availability`,
    { method: 'PATCH' }
  );
  return res.json();
};

export const getOrders = async (params = '') => {
  const res = await fetch(`${API_BASE_URL}/api/orders${params}`);
  return res.json();
};

export const updateOrderStatus = async (id, status) => {
  const res = await fetch(
    `${API_BASE_URL}/api/orders/${id}/status`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }
  );
  return res.json();
};
