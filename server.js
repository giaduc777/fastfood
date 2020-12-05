const bcrypt = require('bcryptjs');
const express = require('express');
const path = require('path');
const app = express();
//const cors = require('cors');
const User = require('./models/User');
const Guess = require('./models/Guess');
const authen = require('./authen');
var nodemailer = require('nodemailer');
const validator = require('validator');
const port = process.env.PORT || 8080
const emailPassword = require('./config/emailPassword');
console.log(">>>>>>>>>>>>.",emailPassword.password)
require('./mongoose');

app.use(express.json());
app.use(express.urlencoded({extended: true}));//

/////////////////////////

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});


//Api endpoints

//Sign in
app.post('/api/signIn', async(req,res) => {
	
	try{
	   const user = await User.findOne({'email': req.body.email});
   
       if(user === null){
        console.log("from SignIn if")
		   res.send(false)
	   }
	   else {
      console.log("from SignIn else")
		   const match = await bcrypt.compare(req.body.password, user.password);

		   if(!match){
        console.log("from SignIn else ---- if")
			    res.send(false);
		   }
			else{
				res.send({
					token: user.tokens[0].token,
					email: user.email,
					firstName: user.firstName
				});
			}
	   }
	}
	catch(err){
		console.log("/api/signIn 3",err)
		res.send("mongoose connection error")
	}
});

//Create new user
app.post('/api/createUser', async(req,res) => {
	console.log("9999999999999999")
    try{
      console.log("10000000000")
		const hash = await bcrypt.hash(req.body.Password, 8);
console.log("before new User()")
		const user = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.Email,
			phone: req.body.Phone,
			password: hash,
			rewardPoints: req.body.rewardPoints
		});
    console.log("after new User()")
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

//Load user on browser refresh
app.post('/api/user', authen, async (req, res) => {
	res.send(req.user)
});


///////////////////
app.get('/polo', authen, (req, res) => {
  //if user is login
	if(req.user){
    try{
  
  res.send("polo is success")
}
catch(err){
  console.log("/polo Error: ", err)
}
}
});

//Place order
app.post('/api/placeOrder', authen, async (req, res) => {
	
	//if user is login
	if(req.user){
        try{
			req.user.orders = req.user.orders.concat({...req.body})
			req.user.rewardPoints += req.body.rewardPoints
			await req.user.save()
			res.send("success")
		}
		catch(err){
			console.log("/api/placeOrder Error: ", err)
		}
	}
	//user is a guess
	else if(req.body.login === false){
		try{
			const guess = new Guess({orders: req.body});
			await guess.save()
			res.send("success")
		}
		catch(err){
			console.log("/api/placeOrder Error: ", err)
		}
	}

	//Send email confirmation
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		  user: 'myfastfood14@gmail.com',
		  pass: emailPassword.password
		}
	});

	let mailOptions = {
		from: 'MyFastFood14@gmail.com',
		to: req.body.email,
		subject: 'Order Confirmation',
		text: "Thanks for your order, it'll be ready in 30 mins."
	  };

	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		  console.log(error);
		} else {
		  console.log('Email sent: ' + info.response);
		}
	});
});

//Profile
app.post('/api/profile', authen, async (req, res) => {
  console.log("/api/profile  begins...: ")
  console.log("/api/profile  req.user", req.user)
	if(req.user){
    //console.log("/api/profile, inside if()", req.user)
		res.send({
			firstName: req.user.firstName, 
			lastName: req.user.lastName, 
			email: req.user.email, 
			phone: req.user.phone, 
			rewardPoints: req.user.rewardPoints
		})
	}
})

//Orders history
app.post('/api/orders', authen, async (req, res) => {
	
	if(req.user){

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
		throw new Error(res.send("no good"))
	}
});

//Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


////////////

app.listen(port, () => {
    console.log("running on port 8080")
});