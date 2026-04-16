import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const Home = () => <h2>Strona Główna Dashboardu</h2>;

const Products = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  const fetchItems = () => fetch('/api/items').then(r => r.json()).then(setItems);
  useEffect(() => { fetchItems(); }, []);

  const addProduct = async (e) => {
    e.preventDefault();
    await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    setName('');
    fetchItems();
  };

  return (
    <div>
      <h2>Lista Produktów</h2>
      <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>
      <form onSubmit={addProduct}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nazwa produktu" required />
        <button type="submit">Dodaj</button>
      </form>
    </div>
  );
};

const Stats = () => {
  const [stats, setStats] = useState({ count: 0, instanceId: 'Ładowanie...', serverTime: '', requestCount: 0 });
  const [health, setHealth] = useState({ uptime: 0 });

  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(setStats);
    fetch('/api/health').then(r => r.json()).then(setHealth);
  }, []);

  return (
    <div>
      <h2>Statystyki</h2>
      <p><strong>Liczba produktów:</strong> {stats.count}</p>
      <p><strong>Obsłużone przez instancję:</strong> {stats.instanceId}</p>
      <p><strong>Aktualny czas serwera:</strong> {stats.serverTime || 'Ładowanie...'}</p>
      <p><strong>Liczba obsłużonych żądań:</strong> {stats.requestCount}</p>
      <p><strong>Uptime kontenera:</strong> {Math.floor(health.uptime)} sekund</p>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '10px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
        <Link to="/products" style={{ marginRight: '10px' }}>Produkty</Link>
        <Link to="/stats">Statystyki</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
}