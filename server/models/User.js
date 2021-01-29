const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const validator = require('validator');

const userSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phone: {
        type: String
    },
    password: {
        type: String
    },
    tokens: [
        {
          token: String
        }
    ],
    rewardPoints: {
        type: Number
    },
    orders: [
        {
            firstName: String,
            lastName: String,
            email: String,
            phone: String,
            subTotal: Number,
            items: {}
        }
    ]
});

userSchema.methods.generateToken = async function(){
    const user = this;
    const token = await jwt.sign({_id: user._id.toString()}, 'mySecret');
    user.tokens = user.tokens.concat({token});

    if(!validator.isEmail(user.email)){
        return {email: false}
    }
    await user.save();
    return {token: token, email: true};
}

const User = mongoose.model('User', userSchema);
module.exports = User;