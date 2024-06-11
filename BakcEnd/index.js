const express = require('express');
const app = express();
const port = 3002;

let values = [];

app.use(express.json());

app.get('/api/values', (req, res) => {
    res.json(values);
});

app.get('/api/data', (req, res) => {
    const { x, y, z } = req.query;
    const newValue = { x: parseFloat(x), y: parseFloat(y), z: parseFloat(z) };
    values.push(newValue);
    if (values.length > 100) values.shift(); // Mantener solo los últimos 100 valores
    res.json(newValue);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
