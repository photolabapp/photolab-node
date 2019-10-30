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


