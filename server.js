const bcrypt = require('bcryptjs');
const express = require('express');
const path = require('path');
const app = express();
const User = require('./models/User');
const Guess = require('./models/Guess');
const authen = require('./authen');
const port = process.env.PORT || 8080
require('./mongoose');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'index.html')))


/////////////////////
const getOrderHistory = (orders) => {
	let orderList=[];

		for( let i=0; i < orders.length; i++){
			orderList.push({
				order: Object.values(orders[i].items),
				time: orders[i]._id.getTimestamp().toString().slice(0,21),
				subTotal: orders[i].subTotal
			})
		}
		console.log("from getOrderHistory >>> ", orderList)
	return orderList;
}

// ** Sign in ** //
app.post('/api/signIn', async(req,res) => {
	console.log("from api/SignIn >>> ")
	try{
	   const user = await User.findOne({'email': req.body.email});
   
       if(user === null){
		   res.send(false)
	   }
	   else {
		   const match = await bcrypt.compare(req.body.password, user.password);

		   if(!match){
			    res.send(false);
		   }
			else{

				/////////////////// get order history
                const tempOrderHistory = getOrderHistory(user.orders)

				///////////////////
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
		console.log("From catch block: ",err)
		res.send("mongoose connection error")
	}
});

// ** Create new user ** //
app.post('/api/createUser', async(req,res) => {

    try{
		const hash = await bcrypt.hash(req.body.Password, 8);

		const user = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.Email,
			phone: req.body.Phone,
			password: hash,
			rewardPoints: req.body.rewardPoints
		});
    
		const status = await user.generateToken();

		res.send({
			token: status.token,
			email: status.email,
			firstName: user.firstName
		})
	}
	catch(err){
		res.send({token: ""})
	}
});

// ** Load user on browser refresh ** //
app.post('/api/user', authen, async (req, res) => {
	
    let user = req.user;
	/////////////////// get order history
	///reUse function///
	const tempOrderHistory = getOrderHistory(user.orders)

	///////////////////reUse
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
	console.log("from /api/placeOrder", req.user)
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
	// ** user is a guess ** //
	else if(req.body.login === false){
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

// ** Orders history ** //
/*
app.post('/api/orders', authen, async (req, res) => {
	
	if(req.user){

		//console.log(req.user)
		let orderList=[];

		for( let i=0; i < req.user.orders.length; i++){
			orderList.push({
				order: Object.values(req.user.orders[i].items),
				time: req.user.orders[i]._id.getTimestamp().toString().slice(0,21),
				subTotal: req.user.orders[i].subTotal
			})
		}

		res.send({
			orderList: orderList
		})
	}
	else if(!req.user){
		throw new Error(res.send("User not found!"));
	}
});
*/

// ** Handles any requests that don't match the ones above ** //
app.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => {
    console.log("running on port: ", port);
});