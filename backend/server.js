import express from "express";
import products from './data/products.js'
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('APP is running. . . .')
})
app.get('/api/products', (req, res) => {
  res.json(products);
})
app.get('/api/products/:id', (req, res) => {
  res.json(products.find(p => p._id == req.params.id));
})
app.listen(port, () => { console.log(`Server running on port ${port}`) })