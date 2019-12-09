const model = require("../model").order;
const orderPhoto = require("../model").orderPhoto;
const user = require("../model").user;

const photoOrder = require("../model").photoOrder;
var exports = module.exports = {};

exports.create = function (req, res) {
    model.create({
        userId: req.body.user,
        status: "CREATED"
    }).then(order => res.json(order));
}

exports.updateToSaved = function (req, res) {
    model.find({
        where: {
            id: req.body.order,
            userId: req.body.user
        }
    }).then(order => {
        order.update({ status: "SAVED", dtUpdate: new Date() }).then(order => res.json(order));
    }).error(err => res.json(err))
}

exports.uploadPhoto = function (req, res) {
    photoOrder.create({
        userId: req.body.user,
        oderId: req.body.order,
        photo: req.body.photo
    }).then(order => res.json(order));
}

exports.getLastOrderCreated = function (req, res) {
    model.findOne({
        where: {
            userId: req.body.user,
            status: "CREATED"
        },
        order: [["id", "DESC"]],
        limit: 1
    }).then(order => {
        if (order) {
            res.json(order);
        } else {
            res.status(412).send("Haven't order with status created");
        }
    }).error(err => res.json(err));
}

exports.findAll = function (req, res) {
    model.findAll().then(async orders => {
        for (key in orders) {
            var getOrderPhotos = await orderPhoto.findAll({ where: { orderId: orders[key].id } })
            orders[key].album = getOrderPhotos
            var getUser = await user.findOne({ where: { id: orders[key].userId } })
            orders[key].user = getUser
        }

        return orders
    }).then(orders => res.json(orders)).error(err => res.json(err));
}

exports.getById = function (req, res) {
    model.find({
        where: {
            id: req.params.id
        }
    }).then(async order => {
        var getOrderPhotos = await orderPhoto.findAll({ where: { orderId: order.id } })
        order.album = getOrderPhotos
        var getUser = await user.findOne({ where: { id: order.userId } })
        order.user = getUser
        
        res.json({ order: order })
    }).error(err => res.json(err));
}