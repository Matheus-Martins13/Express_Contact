const Contato = require('../models/ContatoModel');

exports.index = async (req, res) => {
    if(!req.session.user) return res.render('login');
    try{
        const contatos = await Contato.findContacts();
        return res.render('index', { contatos });
    } catch(err) {
        console.log(err);
        res.render('404');
    }
    
}
