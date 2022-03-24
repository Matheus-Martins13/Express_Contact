const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    if(req.session.user) return res.render('login-logado');
    return res.render('register');
}

exports.register = async function (req, res) {
    try {
        const register = new Login(req.body);
        await register.register();

        if(register.errors.length > 0) {
            req.flash('errors', register.errors);

            req.session.save(function() {
                return res.redirect('back');
            });
            return
        }

        req.flash('success', 'Usuário criado com sucesso!');
        req.session.save(function() {
            return res.redirect('back');
        });

    } catch(err) {
        console.log(err);
        res.render('404');
    }
};
