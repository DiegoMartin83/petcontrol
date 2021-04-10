const mongoose = require('mongoose');
const { Schema } = mongoose;

const hcSchema = new Schema({
    mascota: { type: String, required: true },
    veterinario: { type: String, required: true },
    observaciones: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('HistoriaClinica', hcSchema);