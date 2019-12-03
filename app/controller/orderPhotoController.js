const model = require("../model").orderPhoto;
var exports = module.exports = {};
var AdmZip = require('adm-zip');

exports.uploadPhoto = function (req, res) {
    model.create({
        userId: req.body.user,
        orderId: req.body.order,
        format: req.body.format,
        quantity: req.body.quantity,
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
    model.findAll({
        where: {
            orderId: req.params.id,
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
            res.sendFile(orderPhoto.photo, { root: 'uploads' })
        } else {
            res.status(404).send('Image not found');
        }
    }).error(err => res.json(err));
}

exports.getImages = (req, res) => {
    model.find({
        where: {
            orderId: req.params.id,
        }
    }).then(orderPhotos => {
        if (orderPhotos) {
            var zip = new AdmZip();
            for (key in orderPhotos) {
                let orderPhoto = orderPhotos[key]
                zip.addLocalFile(orderPhoto.photo);
            }
            res.sendFile(orderPhoto.photo, { root: 'uploads' })
            var willSendthis = zip.toBuffer();
            res.download(orderPhoto.photo, { root: 'uploads' })

            console.log('order ' + orderPhoto);
        } else {
            res.status(404).send('Imsage not found');
        }
    }).error(err => res.json(err));
}