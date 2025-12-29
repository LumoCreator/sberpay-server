const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));

const payments = {};

// Страница оплаты
app.get('/pay', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pay.html'));
});

// API — подтверждение оплаты
app.get('/api/pay/confirm', (req, res) => {
  const { terminal, amount } = req.query;
  payments[`${terminal}_${amount}`] = 'confirmed';
  res.json({ result: 'ok' });
});

// API — статус оплаты
app.get('/api/pay/status', (req, res) => {
  const { terminal, amount } = req.query;
  const status = payments[`${terminal}_${amount}`] || 'pending';
  res.json({ status });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server started on port', PORT));
