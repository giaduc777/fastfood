const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GuessSchema = new Schema({
    orders: {
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        token: String,
        subTotal: Number,
        items: {}
    }
});

const Guess = mongoose.model('Guess', GuessSchema);
module.exports = Guess;