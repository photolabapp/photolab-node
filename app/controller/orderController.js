const model = require("../model").order;
const orderPhoto = require("../model").orderPhoto;
const user = require("../model").user;

const photoOrder = require("../model").photoOrder;
var exports = module.exports = {};

exports.create = (req, res) => {
    createOrder(req.body.user, res)
}

const createOrder = (userId, res) => {
    model.create({
        userId: userId,
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
            userId: req.params.id,
            status: "CREATED"
        },
        order: [["id", "DESC"]],
        limit: 1
    }).then(order => {
        if (order) {
            res.json(order);
        } else {
            //res.status(412).send("Haven't order with status created");
            createOrder(req.params.id, res)
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
            orders[key].qtdPhotos = this.getQtdPhotos(orders[key])
        }

        return orders
    }).then(orders => res.json(orders)).error(err => res.json(err));
}

getQtdPhotos = order => {
    var qtd = 0
    for (let key in order.album) {
        qtd = qtd + (1 * order.album[key].quantity)
    }
    return qtd;
}

exports.getById = function (req, res) {
    model.find({
        where: {
            id: { $eq: req.params.id }
        }
    }).then(async order => {
        var getOrderPhotos = await orderPhoto.findAll({ where: { orderId: { $eq: order.id } } })
        order.album = getOrderPhotos
        var getUser = await user.findOne({ where: { id: { $eq: order.userId } } })
        order.user = getUser

        res.json(order)
    }).error(err => res.json(err));
}