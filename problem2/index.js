const express = require('express');
const productsRouter = require('./src/routes/products');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/', productsRouter);

app.get('/', (req, res) => {
    res.send('Top Products Microservice');
});

app.listen(port, () => {
    console.log(`Top Products Microservice running on http://localhost:${port}`);
});
