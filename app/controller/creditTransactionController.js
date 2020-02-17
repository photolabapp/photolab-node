const model = require("../model").creditTransaction;
var exports = module.exports = {};

const createTransactionCredit = (creditTransaction) => {
    model.create(creditTransaction).then(creditCard => res.json(creditCard));
}

exports.getCredit = function (req, res) {
    res.json({ quantity: 0, id: 1, type: "CREDIT" })
}

exports.create = function (req, res) {
    creditTransaction({
        userId: req.body.userId,
        orderId: req.body.orderId,
        type: req.body.type,
        quantity: req.body.quantity
    })
}