const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

const instanceId = crypto.randomBytes(4).toString('hex');

const items = [{ id: 1, name: 'Przykładowy Produkt 1' }];

app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Brak nazwy produktu' });
  
  const newItem = { id: Date.now(), name };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.get('/stats', (req, res) => {
  res.json({
    count: items.length,
    instanceId: instanceId
  });
});

app.listen(3000, () => {
  console.log(`Backend uruchomiony na porcie 3000. Instancja: ${instanceId}`);
});