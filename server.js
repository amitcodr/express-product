const express = require('express');
const path = require('path');
const app = express();

const mainRouter = require('./router/index');
const productRouter = require('./router/products');
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());

app.use(mainRouter);
app.use(productRouter);
app.use((req, res, next) => {
    return res.json({message: 'Page not found'});
});

app.listen(port, () => console.log(`Listening on port ${port}`));

