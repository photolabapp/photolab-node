var userController = require('../controller/userController.js');
var collaboratorController = require('../controller/collaboratorController.js');
var shippingController = require('../controller/shippingController.js');
var orderController = require('../controller/orderController.js');
var orderPhotoController = require('../controller/orderPhotoController.js');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = function (app) {
    app.post('/user', userController.create);
    app.get('/user', userController.read);
    app.get('/user/:id', userController.findById);
    app.post('/login', userController.login);
    app.get('/shipping', shippingController.getByCep)
    app.post('/order', orderController.create);
    app.get('/order/:id', orderController.getById);
    app.get('/order', orderController.findAll);
    app.put('/order', orderController.updateToSaved);
    app.get('/last/order/created', orderController.getLastOrderCreated)
    app.post('/collaborator', collaboratorController.create);
    app.post('/collaborator/login', collaboratorController.login);
    app.get('/photo/order/:id', orderPhotoController.getByOrderId);
    app.get('/photo/image/:id', orderPhotoController.getImage);
    app.get('/photo', orderPhotoController.findAll);
    app.post('/photo', upload.single('photo'), orderPhotoController.uploadPhoto);
}