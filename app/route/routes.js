var userController = require('../controller/userController.js');
var shippingController = require('../controller/shippingController.js');
var orderController = require('../controller/orderController.js');
var orderPhotoController = require('../controller/orderPhotoController.js');
var multer  = require('multer')

//var upload = multer({ storage: multer.memoryStorage({}) })
var upload = multer({ dest: 'uploads/' })

module.exports = function (app) {
    
   app.use(function (req, res, next) {

    	// Website you wish to allow to connect
    	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');

    	// Request methods you wish to allow
    	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    	// Request headers you wish to allow
    	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    	// Set to true if you need the website to include cookies in the requests sent
    	// to the API (e.g. in case you use sessions)
    	res.setHeader('Access-Control-Allow-Credentials', true);

    	// Pass to next layer of middleware
      	next();
    });    

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
