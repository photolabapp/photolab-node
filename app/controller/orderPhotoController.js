const model = require("../model").orderPhoto;
var exports = module.exports = {};

exports.uploadPhoto = function (req, res) {
    console.log("LOG -------- name " + req.file.filename + " type " + req.file.mimetype)  
    model.create({
        user_id: req.body.user,
        order_id: req.body.order,
        photo: req.file.filename,
        type: req.file.mimetype
    }).then(order => res.json(order));
}


