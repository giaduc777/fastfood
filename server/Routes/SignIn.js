const User = require('../models/User');
const bcrypt = require('bcryptjs');
const getOrderHistory = require('./GetOrderHistory');

module.exports = (app) => {
    app.post('/api/signIn', async(req,res) => {
        
        try{
           const user = await User.findOne({'email': req.body.email});
           console.log("from backend: >>>", user)
           if(user === null){
               res.send(false)
           }
           else {
               const match = await bcrypt.compare(req.body.password, user.password);
            
               if(!match){
                    res.send(false);
               }
                else{
                    const tempOrderHistory = getOrderHistory(user.orders)
    
                    res.send({
                        token: user.tokens[0].token,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        rewardPoints: user.rewardPoints,
                        phone: user.phone,
                        orderHistory: tempOrderHistory
                    });
                }
           }
        }
        catch(err){
            console.log("EER: api/SignIn : ",err)
            res.send("mongoose connection error")
        }
    });
}