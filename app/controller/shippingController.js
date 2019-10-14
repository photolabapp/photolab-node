var exports = module.exports = {};

exports.getByCep = function (req ,res) {
    res.json({ 
        shipping: { 
            city: "São Paulo", 
            values: [{
                description: "Correios",
                time: "6 dias úteis",
                value: 23.45
            },{
                description: "Retirada no local",
                time: "1 dia útil",
                value: 0.0
            }] 
        }
    });
}