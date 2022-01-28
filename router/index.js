const router = require('express').Router();
const apiKeyMiddleware = require('../middlewares/apiKey');

// router.use(apiKeyMiddleware);

router.get('/', (req, res) => {
    // res.sendFile(path.resolve(__dirname) + '/index.html');
    res.render('index', {
        'title' : 'Home page'
    });
});


router.get('/about', (req, res) => {
    // res.sendFile(path.resolve(__dirname) + '/about.html');
    res.render('about', {
        'title' : 'About page'
    });
});


router.get('/download', (req, res) => {
    res.download(path.resolve(__dirname) + '/about.html');
});


// router.get('/api/products', apiKeyMiddleware, (req, res) => {
//     res.json([
//         {
//             id: '123',
//             name: 'Chrome'
//         },
//         {
//             id: '124',
//             name: 'Mozzila'
//         }
//     ]);
// });

module.exports = router;