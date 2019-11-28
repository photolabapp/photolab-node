const model = require("../model").orderPhoto;
var exports = module.exports = {};

exports.uploadPhoto = function (req, res) {
    console.log("LOG -------- name " + req.file.filename + " type " + req.file.mimetype)
    model.create({
        userId: req.body.user,
        orderId: req.body.order,
        photo: req.file.filename,
        type: req.file.mimetype
    }).then(order => res.json(order));
}

exports.findAll = function (req, res) {
    model.findAll()
        .then(user => res.json(user))
        .error(err => res.json(err));
}

exports.getByOrderId = function (req, res) {
    model.find({
        where: {
            orderId: req.params.order,
        }
    }).then(orderPhoto => {
        console.log('order ' + orderPhoto);
        if (orderPhoto) {
            res.json(orderPhoto);
        } else {
            res.status(412).send("Haven't orderPhoto with order " + req.params.id);
        }
    }).error(err => res.json(err));
}

exports.getImage = (req, res) => {
    model.find({
        where: {
            id: req.params.id,
        }
    }).then(orderPhoto => {
        console.log('order ' + orderPhoto);
        if (orderPhoto) {
            res.sendFile(orderPhoto.photo);
        } else {
            res.status(404).send('Image not found');
        }
    }).error(err => res.json(err));
}