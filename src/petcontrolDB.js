'use strict'

const mongoose = require('mongoose');
const colors = require('colors');
let urlDB;

urlDB = 'mongodb://localhost:27017/petcontrol';
let estado = "ONLINE"
mongoose.connect('mongodb://localhost:27017/petcontrol', {

    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})



.then(db => console.log(`La base de datos PET CONTROL estado: ${estado.green}`))
    .catch(err => Sconsole.error(err));