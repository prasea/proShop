import express from "express";
import products from './data/products.js'
import dotenv from "dotenv"
dotenv.config();
const app = express();
const port = process.env.PORT;

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