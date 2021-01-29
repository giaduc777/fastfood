const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = (app) =>{

    app.post('/api/createUser', async(req,res) => {
        try{
            const hash = await bcrypt.hash(req.body.password, 8);
           
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                password: hash,
                rewardPoints: req.body.rewardPoints
            });

            const status = await user.generateToken();
      
            res.send({
                emailStatus: status.email,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                orderHistory: "",
                phone: user.phone,
                rewardPoints: user.rewardPoints,
                token: status.token,
                login: true
            })
        }
        catch(err){
            console.log("ERR: /api/createUser: ", err)
            res.send({token: ""})
        }
    });
}