const Register = require('../models/RegisterModel');

exports.index = (req, res) => {
    res.render('register');
    return 
}

exports.register = (req, res) => {
    const register = new Register(req.body);

    //if(register.errors.length > 0) 
    register.register();

    res.send(register.errors);
}
