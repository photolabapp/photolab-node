const model = require("../model").collaborator;
var exports = module.exports = {};

exports.create = async (req, res) => {
    try {
        let user = await model.findOne({ where: { id: { $eq: req.body.id } } })
        console.log("usudsudus " + JSON.stringify(user))
        if (user) {
            user.update({
                name: req.body.name,
                email: req.body.email,
                password: (req.body.password) ? req.body.password : user.password,
                dtUpdate: new Date()
            }).then(order => res.json(order));
        } else {
            let email = await model.findOne({ where: { email: { $eq: req.body.email } } })
            if (email) {
                res.status(412).send({ message: "E-mail " + req.body.email + " já existe!!!" })
            } else {
                model.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                }).then(collaborator => res.json(collaborator))
            }
        }
    } catch (error) {
        res.json(error)
    }
}

exports.read = function (req, res) {
    model.findAll()
        .then(collaborator => res.json(collaborator))
        .error(err => res.json(err));
};

exports.login = function (req, res) {
    model.find({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    }).then(collaborator => {
        console.log('collaborator ' + collaborator);
        if (collaborator) {
            collaborator.password = ""
            var concat = collaborator.email + ":" + collaborator.password
            let buff = new Buffer(concat);
            let base64data = buff.toString('base64');

            res.json({ collaborator: collaborator, accessToken: base64data });
        } else {
            res.status(403).send({ message: "Usuário ou senha inválidos" });
        }
    }).error(err => res.json(err));
}

exports.getById = function (req, res) {
    model.find({
        where: {
            id: { $eq: req.params.id }
        }
    }).then(collaborator => {
        res.json(collaborator);
    }).error(err => res.json(err));
}
