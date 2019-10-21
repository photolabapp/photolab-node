const model = require("../model").order;
const photoOrder = require("../model").photoOrder;
var exports = module.exports = {};

exports.create = function (req, res) {
    model.create({
        user_id: req.body.user,
        status: "CREATED"
    }).then(order => res.json(order));
}

exports.updateToSaved = function (req, res) {
    model.find({
        where: {
            id: req.body.order,
            user_id: req.body.user
        }
    }).then(order => {
        order.update({ status: "SAVED", dtUpdate: new Date() }).then(order => res.json(order));
    }).error(err => res.json(err))
}

exports.uploadPhoto = function (req, res) {
    photoOrder.create({
        user_id: req.body.user,
        oder_id: req.body.order,
        photo: req.body.photo
    }).then(order => res.json(order));
}

exports.getLastOrderCreated = function (req, res) {
    model.find({
        where: {
            user_id: req.body.user,
            status: "CREATED"
        },
        order: [["id", "DESC"]],
        limit: 1
    }).then(order => {
        console.log('order ' + order);
        if (order) {
            res.json(order);
        } else {
            res.status(412).send("Haven't order with status created");
        }
    }).error(err => res.json(err));
}

exports.findAll = function (req, res) {
    model.findAll()
        .then(user => res.json(user))
        .error(err => res.json(err));
}