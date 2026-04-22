const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

const instanceId = process.env.INSTANCE_ID || crypto.randomBytes(4).toString('hex');
const items = [{ id: 1, name: 'Przykładowy Produkt 1' }];

let requestCount = 0;

app.use((req, res, next) => {
  requestCount++;
  next();
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime()
  });
});

app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Brak nazwy' });
  
  const newItem = { id: Date.now(), name };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.get('/stats', (req, res) => {
  res.json({
    count: items.length,
    instanceId: instanceId,
    serverTime: new Date().toISOString(),
    requestCount: requestCount
  });
});

if (require.main === module) {
  app.listen(3000, () => console.log(`Backend działa. ID: ${instanceId}`));
}
module.exports = app;