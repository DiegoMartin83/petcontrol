const helpers = {};

helpers.autenticado = (req, res, next) => {
    if (req.autenticado()) {
        return next();
    }
    req.flash('error_msg', 'Está intentando acceder a un sitio no autorizado');
    res.redirect('/users/login');
};

module.exports = helpers;