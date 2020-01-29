const model = require("../model").creditCard;
var exports = module.exports = {};

exports.getCreditCard = async (req, res) => {
    model.findAll({ where: { userId: req.param.id } }).then(creditCards => {
        res.json(creditCards);
    }).catch(err => {
        res.json(err)
    })
}

const maskNumber = (number) => {

}

const getBrand = (number) => {

}

exports.create = function (req, res) {
    model.create({
        userId: req.body.userId,
        number: maskNumber(req.body.number),
        validate: req.body.validate,
        cardHolder: req.body.cardHolder,
        brand: getBrand(req.body.number)
    }).then(creditCard => res.json(creditCard));
}