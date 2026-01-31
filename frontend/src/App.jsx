import MenuPage from './pages/MenuPage';
import OrdersPage from './pages/OrdersPage';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Restaurant Admin Dashboard</h1>

      <MenuPage />

      <hr style={{ margin: '40px 0' }} />

      <OrdersPage />
    </div>
  );
}

export default App;
