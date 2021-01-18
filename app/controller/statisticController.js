const user = require("../model").user;
const order = require("../model").order;

var exports = module.exports = {};

exports.getDashBoard = function (req, res) {
    res.json({
        dashboard: {
            customer: "São Paulo",
            values: [{
                description: "Correios",
                time: "6 dias úteis",
                value: 23.45
            }, {
                description: "Retirada no local",
                time: "1 dia útil",
                value: 0.0
            }]
        }
    });
}