const model = require("../model").creditCard;
var exports = module.exports = {};

exports.getCreditCard = async (req, res) => {
    model.findAll({ where: { userId: req.params.id } }).then(creditCards => {
        res.json(creditCards);
    }).catch(err => {
        res.json(err)
    })
}

const maskNumber = (number) => {
    const prefix = number.substring(0, 4)
    const sufix = number.substring(number.length - 4, number.length)

    return prefix + " **** **** " + sufix
}

const getBrand = (number) => {
    const regexVisa = new RegExp("^4[0-9]{3} [0-9]{2}")
    const regexMasterCard = new RegExp("^5[1-5][0-9]{2} [0-9]{2}")

    if (regexVisa.test(number)) {
        return "VISA"
    } else if (regexMasterCard.test(number)) {
        return "MASTERCARD"
    }

    return ""
}

const clearCpf = cpf => {
    var newCpf = cpf.replace(".", "")
    newCpf = newCpf.replace(".", "")
    newCpf = newCpf.replace("-", "")

    return newCpf
}

exports.create = function (req, res) {
    model.create({
        userId: req.body.userId,
        number: maskNumber(req.body.number),
        dueDate: req.body.dueDate,
        cpf: clearCpf(req.body.cpf),
        cardHolder: req.body.cardHolder,
        brand: getBrand(req.body.number)
    }).then(creditCard => res.json(creditCard));
}