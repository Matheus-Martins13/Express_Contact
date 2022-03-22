exports.middlewareGlobal = (req, res, next) => {
    // para injetar dados em todas as rotas de uma só vez
    res.locals.umaVariavelLocal = 'Este é o valor da variável local.';
    next();
}

exports.checkCsrfError = (err, req, res, next) => {
    if(err && err.code === 'EBADCSRFTOKEN') {
        return res.render('404');
    }
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}
