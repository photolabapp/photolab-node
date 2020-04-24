var userController = require('../controller/userController.js');
var collaboratorController = require('../controller/collaboratorController.js');
var shippingController = require('../controller/shippingController.js');
var addressController = require('../controller/addressController.js');
var orderController = require('../controller/orderController.js');
var orderPhotoController = require('../controller/orderPhotoController.js');
var creditCardController = require('../controller/creditCardController.js');
var creditTransactionController = require('../controller/creditTransactionController.js');

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = function (app) {
    app.post('/user', userController.create);
    app.get('/user', userController.read);
    app.get('/user/:id', userController.findById);
    app.post('/login', userController.login);

    //Shipping
    app.get('/shipping', shippingController.getByCep)
    app.get('/shipping/address/user/:id', addressController.getShippingAddress)

    //Order
    app.post('/order', orderController.create);
    app.get('/order/:id', orderController.getById);
    app.get('/order', orderController.findAll);
    app.put('/order', orderController.updateToSaved);
    //TODO trocar o nome e mudar para post
    app.get('/last/order/created/:id', orderController.getLastOrderCreated)

    //Collaborator
    app.post('/login/collaborator', collaboratorController.login);
    app.post('/collaborator', collaboratorController.create);
    app.get('/collaborator', collaboratorController.read);
    app.get('/collaborator/:id', collaboratorController.getById);

    //Photo
    app.get('/photo/order/:id', orderPhotoController.getByOrderId);
    app.get('/photo/image/:id', orderPhotoController.getImage);
    app.get('/photo', orderPhotoController.findAll);
    app.get('/photo/images/order/:id', orderPhotoController.getImages);
    app.post('/photo', upload.single('photo'), orderPhotoController.uploadPhoto);

    //CreditCard
    app.get('/creditCard/user/:id', creditCardController.getCreditCard)
    app.post('/creditCard', creditCardController.create)

    //Credit
    app.get('/credit/user/:id', creditTransactionController.getCredit)
    
    //Address
    app.post('/address', addressController.create)
    
}