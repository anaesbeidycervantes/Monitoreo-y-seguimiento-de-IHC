const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3002;

let values = [];

app.use(cors());
app.use(express.json());

// Ruta para servir archivos estáticos desde la carpeta FrontEnd
app.use(express.static(path.join(__dirname, '../FrontEnd')));

// Ruta para enviar index.html cuando se accede a la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../FrontEnd', 'index.html'));
});

app.get('/api/values', (req, res) => {
    res.json(values);
});

app.get('/api/data', (req, res) => {
    const { x, y, z } = req.query;
    const newValue = { x: parseFloat(x), y: parseFloat(y), z: parseFloat(z) };
    values.push(newValue);
    if (values.length > 100) values.shift();
    res.json(newValue);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
