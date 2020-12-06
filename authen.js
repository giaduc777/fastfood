const jwt = require('jsonwebtoken');
const User = require('./models/User');

const authen = async (req, res, next) => {

    try{
        const decoded = await jwt.verify(req.body.token, 'mySecret');
        const user = await User.findOne({_id: decoded._id, 'tokens.token': req.body.token})
        
        if(!user){
            throw new Error();
        }
    
        req.user = user;
    }
    catch(err){
        req.user = null;
    }

    next()
}

module.exports = authen;