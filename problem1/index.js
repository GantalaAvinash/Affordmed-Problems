const express = require('express');
const app = express();
const port = 9876;

const numbers = require('./components/numberSeries.js');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/numbers/:numberid', async (req, res) => {
    try {
        const numberid = req.params.numberid;
        const number = await numbers.getNumbers(numberid);  // Ensure await is used
        res.json(number);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
