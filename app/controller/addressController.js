const model = require("../model").address;
var exports = module.exports = {};

exports.getShippingAddress = async (req, res) => {
    try {
        const listUserAddress = await model.findAll({ where: { userId: req.params.id } })
        const listDefaultAddress = await model.findAll({ where: { id: 1 } })

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
        state: req.body.city,
        cep: req.body.cep,
        selected: req.body.selected,
        price: 23.32,
        dtCreate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: "dt_create" },
        dtUpdate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: "dt_update" },
    }).then(order => res.json(order));
}