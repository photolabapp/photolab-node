var userController = require('../controller/userController.js');
var shippingController = require('../controller/shippingController.js');
var orderController = require('../controller/orderController.js');
var orderPhotoController = require('../controller/orderPhotoController.js');
var multer  = require('multer')
//var cors = require('cors');

//var upload = multer({ storage: multer.memoryStorage({}) })
var upload = multer({ dest: 'uploads/' })

module.exports = function (app) {
    //app.use(cors({origin: 'http://localhost:8080'}));
    app.post('/user', userController.create);
    app.get('/user', userController.read);
    app.get('/user/id', userController.findById);
    app.post('/login', userController.login);
    app.get('/shipping', shippingController.getByCep)
    app.post('/order', orderController.create);
    app.get('/order/all', orderController.findAll);
    app.put('/order/saved', orderController.updateToSaved);
    app.post('/order/photo', upload.single('photo'), orderPhotoController.uploadPhoto);
    app.get('/order/last/created', orderController.getLastOrderCreated)
}
