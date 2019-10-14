const model = require("../model").user;
var exports = module.exports = {};

exports.create = function (req, res) {
    model.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        console.log('user ' + user);
        if (!user) {
            model.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            }).then(user => {
                var concat = user.email + ":" + user.password
                let buff = Buffer.alloc(concat.length, concat);
                let base64data = buff.toString('base64');
                res.json({ user: user, accessToken: base64data })
            })
        } else {
            res.status(412).send({message: "E-mail " + req.body.email  + " já existe!!!"});
        }
    }).error(err => res.json(err));
};

exports.read = function (req, res) {
    model.findAll()
        .then(user => res.json(user))
        .error(err => res.json(err));
};

exports.login = function (req, res) {
    model.find({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    }).then(user => {
        console.log('user ' + user);
        if (user) {
            var concat = user.email + ":" + user.password
            let buff = new Buffer(concat);
            let base64data = buff.toString('base64');

            res.json({ user: user, accessToken: base64data });
        } else {
            res.status(403).send({message: "Usuário ou senha inválidos"});
        }
    }).error(err => res.json(err));
}
