import { useEffect, useState } from 'react';
import {
  getMenuItems,
  searchMenuItems,
  toggleAvailability
} from '../api/api';
import useDebounce from '../hooks/useDebounce';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    fetchMenu();
  }, [category]);

  useEffect(() => {
    if (debouncedSearch.trim() === '') {
      fetchMenu();
    } else {
      handleSearch();
    }
  }, [debouncedSearch]);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError(null);
      let query = category ? `?category=${category}` : '';
      const data = await getMenuItems(query);
      setMenuItems(data);
    } catch {
      setError('Failed to load menu');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchMenuItems(debouncedSearch);
      setMenuItems(data);
    } catch {
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAvailability = async (id) => {
    setMenuItems(prev =>
      prev.map(item =>
        item._id === id
          ? { ...item, isAvailable: !item.isAvailable }
          : item
      )
    );

    try {
      await toggleAvailability(id);
    } catch {
      fetchMenu();
      alert('Update failed');
    }
  };

  return (
    <div className="container card">
      <h2>🍽️ Menu Management</h2>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option>Appetizer</option>
          <option>Main Course</option>
          <option>Dessert</option>
          <option>Beverage</option>
        </select>

        <input
          placeholder="Search food..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1 }}
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
  {menuItems.map(item => (
    <tr key={item._id}>
      <td>
        <strong>{item.name}</strong>
      </td>

      <td>
        <span className="category-pill">{item.category}</span>
      </td>

      <td className="price">₹{item.price}</td>

      <td>
        <button
          className={
            item.isAvailable ? 'available-btn' : 'unavailable-btn'
          }
          onClick={() => handleToggleAvailability(item._id)}
        >
          {item.isAvailable ? 'Available' : 'Unavailable'}
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default MenuPage;
