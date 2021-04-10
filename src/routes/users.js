const express = require('express');
const { route } = require('.');
const router = express.Router();
const User = require('../models/Users');
const passport = require('passport');

router.get('/users/login', (req, res) => {
    res.render('users/login');
});

router.post('/users/login', passport.authenticate('local', {
    succesRedirect: '/historiaClinica',
    failureRedirect: '/users/login',
    failureFlash: true

}));


router.get('/users/register', (req, res) => {
    res.render('users/register');
});

router.post('/users/register', async(req, res) => {
    const { name, surname, email, enrollment, file, password, confirmpwd } = req.body;
    const errors = [];
    if (name.length <= 0) {
        errors.push({ text: ' Debe ingresar su nombre!' });
    }
    if (surname.length <= 0) {
        errors.push({ text: 'Debe ingresar su apellido!' });
    }
    if (file.length < 0) {
        errors.push({ text: 'Debe ingresar su número de legajo!' })
    }
    if (file.length < 0) {
        errors.push({ text: 'Debe contener al menos 5 caracteres' });

    }
    if (enrollment.length <= 0) {
        errors.push({ text: 'Debe ingresar su número de matrícula!' });
    }

    if (email.length < 0) {
        errors.push({ text: 'Debe ingresar su correo electrónico!' });
    }
    if (password != confirmpwd) {

        errors.push({ text: 'Las contraseñas no coinciden!' });
    }
    if (password.length < 4) {
        errors.push({ text: 'La contraseña debe ser mayor  a cuatro caracteres!' });
    }
    if (errors.length > 0) {
        res.render('users/register', { errors, name, surname, email, enrollment, file, password, confirmpwd });

    } else {

        const emailUser = await User.findOne({ email: email })
        if (emailUser) {

            req.flash('success_msg', "El correo electrónico ingresad o ya se encuentra registrado!");
            res.redirect('/users/register');

        } else {
            const newUser = new User({ name, surname, email, enrollment, file, password });
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save();
            req.flash('success_msg', "El usuario ha sido registrado con éxito!");
            res.redirect('/users/login');
        }
    }
});

router.get('/users/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
})


module.exports = router;