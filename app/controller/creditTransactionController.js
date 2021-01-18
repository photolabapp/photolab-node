const model = require("../model").creditTransaction;
var exports = module.exports = {};

const createTransactionCredit = (creditTransaction) => {
    model.create(creditTransaction).then(creditCard => res.json(creditCard));
}

exports.create = function (req, res) {
    creditTransaction({
        userId: req.body.userId,
        orderId: req.body.orderId,
        type: req.body.type,
        quantity: req.body.quantity
    })
}

exports.getCreditTransactionsById = (req, res) => {
    model.find({
        where: {
            id: { $eq: req.params.id }
        }
    }).then(async transactions => {
        res.json(transactions)
    }).error(err => res.json(err));
}

exports.getCredit = async (req, res) => {
    var credit = await model.sum('quantity', { where: { type: { $eq: "CREDIT" }, userId: { $eq: req.params.id } } })
    if (!credit) credit = 0

    var debit = await model.sum('quantity', { where: { type: { $eq: "DEBIT" }, userId: { $eq: req.params.id } } })
    if (!debit) debit = 0

    res.json({ quantity: credit - debit })
}