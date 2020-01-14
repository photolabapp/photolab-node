const model = require("../model").orderPhoto;
var exports = module.exports = {};
var AdmZip = require("adm-zip");
var fs = require("fs");

exports.uploadPhoto = function (req, res) {
    var extension = req.file.mimetype.split("/")[1]
    var path = "~/Project/photolab-node/uploads/"
    var newFile = req.file.filename + "." + extension
    fs.rename(path + req.file.filename, path + newFile, (err) => {
        if (err) throw err;
        model.create({
            userId: req.body.user,
            orderId: req.body.order,
            format: req.body.format,
            quantity: req.body.quantity,
            photo: newFile,
            type: req.file.mimetype
        }).then(order => res.json(order));
    })
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
    model.findAll({
        where: {
            orderId: req.params.id,
        }
    }).then(orderPhotos => {
        if (orderPhotos) {
            let zip = new AdmZip();
            for (key in orderPhotos) {
                let orderPhoto = orderPhotos[key]
                zip.addLocalFile("~/Project/photolab-node/uploads/" + orderPhoto.photo)
            }
            
            let buffer = zip.toBuffer();
            let fileName = '~/Project/photolab-node/uploads/' + req.params.id + ".zip"
            
            fs.writeFile(fileName, buffer, function () {
                res.download(fileName);
            });
        } else {
            res.status(404).send('Image not found');
        }
    }).error(err => res.json(err));
}