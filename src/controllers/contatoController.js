const { async } = require('regenerator-runtime');
const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
    res.render('contato', { contato: {} });
};

exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }

        req.flash('success', 'Contato registrado com sucesso.');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
        return;
    } catch (err) {
        console.log(err);
        return res.render('404');
    }
};

exports.editIndex = async (req, res) => {
    if (!req.params.id) return res.render('404');

    const contato = await Contato.findId(req.params.id);
    if (!contato) return res.render('404');

    res.render('contato', { contato });
};

exports.edit = async (req, res) => {
    try {
        if(!req.params.id) return res.render('404');
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);

        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }

        req.flash('success', 'Contato editado com sucesso.');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
        return;
    } catch (err) {
        console.log(err);
        return res.render('404');
    }
};

exports.delete = async (req, res) => {
    if(!req.params.id) return res.render('404');
    try {
        const contato = await Contato.deleteContact(req.params.id);
        if(!contato) return res.render('404');

        req.flash('success', 'Contato removido com sucesso.');
        req.session.save(() => res.redirect('back'));
        
    } catch(err) {
        console.log(err);
        res.render('404');
    }
}
