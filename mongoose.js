const mongoose = require('mongoose');
const MongooseUrl = 'mongodb+srv://admin:A2z1NspEvulnlJbh@polo-cbxay.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(MongooseUrl,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, res) => {
    if(err){
        console.log("from mongoose.js, ERROR: ",err)
    }
    else if(res){
        console.log("from mongoose.js, connection success... ")
    }
});

module.exports = mongoose;

//Prod:
//Prod-mongodb:
//mongodb+srv://polo:lPyV5pUypKuPKFD@cluster0-asewq.mongodb.net/test?retryWrites=true&w=majority
//lPyV5pUypKuPKFDF