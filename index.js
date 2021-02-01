const bcrypt = require('bcryptjs');
const express = require('express');
const path = require('path');
const app = express();
const Guess = require('./server/models/Guess');
const authen = require('./server/authen');
const port = process.env.PORT || 8080
require('./server/mongoose');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'index.html')))

require('./server/Routes/CreateUser')(app);
require('./server/Routes/SignIn')(app);

const getOrderHistory = (orders) => {
	let orderList=[];

		for( let i=0; i < orders.length; i++){
			orderList.push({
				order: Object.values(orders[i].items),
				time: orders[i]._id.getTimestamp().toString().slice(0,21),
				subTotal: orders[i].subTotal
			})
		}
	return orderList;
}


// ** Load user on browser refresh ** //
app.post('/api/user', authen, async (req, res) => {
	
    let user = req.user;
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
});


// ** Place order ** //
app.post('/api/placeOrder', authen, async (req, res) => {
	
	// ** if user is login ** //
	if(req.user){
		
        try{
			req.user.orders = req.user.orders.concat({...req.body})
			req.user.rewardPoints += req.body.rewardPoints
			await req.user.save()
			res.send("success")
		}
		catch(err){
			console.log("From catch block: ", err)
		}
	}
	// ** user is a guess ** /
	else if(req.user === null){
		try{
			const guess = new Guess({orders: req.body});
			await guess.save()
			res.send("success")
		}
		catch(err){
			console.log("From catch block: ", err)
		}
	}

	// ** Put nodeMailer.txt code here to enable email confirmation ** //
});


// ** Profile ** //
app.post('/api/profile', authen, async (req, res) => {

	if(req.user){
		res.send({
			firstName: req.user.firstName, 
			lastName: req.user.lastName, 
			email: req.user.email, 
			phone: req.user.phone, 
			rewardPoints: req.user.rewardPoints
		})
	}
})

// ** Handles any requests that don't match the ones above ** //
app.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => {
    console.log("running on port: ", port);
});