const model = require("../model").address;
var exports = module.exports = {};

exports.getShippingAddress = async (req, res) => {
    try {
        const listUserAddress = await model.findAll({ where: { userId: req.params.id } })
        const listDefaultAddress = await model.findAll({ where: { userId: null } })

        const address = []
        listDefaultAddress.forEach(defaultAddress => {
            address.push(defaultAddress)
        })
        listUserAddress.forEach(userAddress => {
            address.push(userAddress)
        })
        
        res.json(address);
    } catch (error) {
        res.json(err)
    }
}

exports.create = function (req, res) {
    model.create({
        userId: req.body.userId,
        title: req.body.title,
        address: req.body.address,
        number: req.body.number,
        complement: req.body.complement,
        city: req.body.city,
        neighborhood: req.body.neighborhood,
        state: req.body.city,
        cep: req.body.cep,
        type: req.body.type,
        selected: req.body.selected,
        price: 23.32
    }).then(address => res.json(address));
}