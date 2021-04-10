const express = require('express');
const router = express.Router();
const Historia = require('../models/HistoriaClinica');
const passport = require('passport');

const { autenticado } = require('../helpers/auth');

router.get('/historiaClinica/add', async(req, res) => {
    res.render('historiaClinica/new-hc');
});

router.post('/historiaClinica/new-hc', async(req, res) => {
    const { mascota, veterinario, observaciones } = req.body;
    const errors = [];
    if (!mascota) {
        errors.push({ text: 'Debe insertar el nombre de la mascota' });

    }
    if (!veterinario) {
        errors.push({ text: 'Debe insertar el nombre del veterinario' });

    }
    if (!observaciones) {
        errors.push({ text: 'Debe agregar alguna descripcion al campo' });

    }

    if (errors.length > 0) {
        res.render('historiaClinica/new-hc', {
            errors,
            mascota,
            veterinario,
            observaciones
        });
    } else {
        // res.send('ok');
        const newHistoria = new Historia({ mascota, veterinario, observaciones });
        await newHistoria.save();
        req.flash('success_msg', 'Historia clínica agregada exitosamente!!!');
        res.redirect('/historiaClinica');
    }
});
// router.get('/historiaClinica', (req, res) => {
//     res.send('Historias clinicas del usuario');
// });
router.get('/historiaClinica', async(req, res) => {

    const hClinicas = await Historia.find().sort({ date: 'desc' });
    res.render('historiaClinica/all-hc', { hClinicas });
});

router.get('/historiaClinica/edit/:id', async(req, res) => {
    const hClinEdit = await Historia.findById(req.params.id);
    res.render('historiaClinica/edit-hc', { hClinEdit });
})

router.put('/historiaClinica/edit-hc/:id', async(req, res) => {

    const { mascota, veterinario, observaciones } = req.body;
    await Historia.findByIdAndUpdate(req.params.id, { mascota, veterinario, observaciones });
    req.flash('success_msg', 'La ficha se ha modificado de manera exitosa!!!');
    res.redirect('/historiaClinica');
});

router.delete('/historiaClinica/delete/:id', async(req, res) => {
    await Historia.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'La ficha ha sido eliminada de manera exitosa!!!');
    res.redirect('/historiaClinica');
})

module.exports = router;