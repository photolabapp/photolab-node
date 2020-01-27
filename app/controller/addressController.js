const model = require("../model").address;
var exports = module.exports = {};

exports.getAddress = async (req, res) => {
    try {
        const userAddress = model.findAll({ where: { userId: req.params.userId } })
        const defaultAddress = model.findAll({ where: { id: 1 } })

        const address = []
        address.push(defaultAddress)
        address.push(userAddress)

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
        cep: req.body.cep,
        dtCreate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: "dt_create" },
        dtUpdate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: "dt_update" },
    }).then(order => res.json(order));
}