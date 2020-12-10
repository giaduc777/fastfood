import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import classes from './App.module.scss';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {ADDRESS} from './herokuProxy';

import Layout from './containers/Layout/Layout';
import YourCart from './containers/YourCart/YourCart';
import Checkout from './containers/Checkout/Checkout';
import AboutUs from './containers/AboutUs/AboutUs';
import SignIn from './containers/SignIn/SignIn';
import MemberRewards from './containers/MemberRewards/MemberRewards';
import Orders from './containers/Orders/Orders';
import Profile from './containers/Profile/Profile';
import ReviewOrder from './containers/ReviewOrder/ReviewOrder';
import PlaceYourOrder from './containers/PlaceYourOrder/PlaceYourOrder';
import CreateAccount from './containers/CreateAccount/CreateAccount';

import SpinningCircle from './components/SpinningCircle/SpinningCircle';

import deal1 from './asset/slideItems_300_compress/deal1_300.jpg';
import deal2 from '../src/asset/slideItems_300_compress/deal2_300.jpg';
import deal3 from '../src/asset/slideItems_300_compress/deal3_300.jpg';
import deal7 from '../src/asset/slideItems_300_compress/deal7_300.jpg';
import deal8 from '../src/asset/slideItems_300_compress/deal8_300.jpg';
import deal9 from '../src/asset/slideItems_300_compress/deal9_300.jpg';

import hour4 from '../src/asset/slideItems_300_compress/deal4_300.jpg';
import hour5 from '../src/asset/slideItems_300_compress/deal5_300.jpg';
import hour6 from '../src/asset/slideItems_300_compress/deal6_300.jpg';
import hour10 from '../src/asset/slideItems_300_compress/deal10_300.jpeg';
import redwinepasta from '../src/asset/slideItems_300_compress/redwinepasta_300.jpg';

import sliceOfVeganPizza from '../src/asset/menus_300_compress/sliceOfVeganPizza_300.jpg';
import sliceOfCheese from '../src/asset/menus_300_compress/sliceOfCheese_300.jpg';
import supremeHotdog from '../src/asset/menus_300_compress/supremeHotdog_300.jpg';
import kobeBurger from '../src/asset/menus_300_compress/kobeBurger_300.jpg';
import jumboChiliDog from '../src/asset/menus_300_compress/jumboChiliDog_300.jpg';
import fryMushroom from '../src/asset/menus_300_compress/fryMushroom_300.jpg';
import onionRings from '../src/asset/menus_300_compress/onionRings_300.jpg';
import appleJuice from '../src/asset/menus_300_compress/appleJuice_300.jpg';
import gingerAle from '../src/asset/menus_300_compress/gingerAle_300.jpg';
import rootbeerFloat from '../src/asset/menus_300_compress/rootbeerFloat_300.jpg';

class App extends Component {
  
  async componentDidMount(){
    /* When component first mount, retrieve token from local storage
      & authenticate with the server.(token either exist or its doesn't).
      This will only execute when new browser is open. If token doesn't 
      exist than user doesn't exist. */

    // ** enable if local storage need to be reset ** //
    // ** localStorage.clear(); ** //
    try{

      let myURL;

        if( process.env.NODE_ENV === 'production'){
            myURL = ADDRESS + '/api/user';
        }
        else {
            myURL = '/api/user';
        }

      const user = await axios.post(myURL, {token: localStorage.getItem("token")});
      
      this.props.setUser(user.data.firstName);
      
      if(user.data && localStorage.getItem("items")){
        const items = JSON.parse(localStorage.getItem("items"))
        this.setState({itemsInCart: items, login: true})
      }
      else if(localStorage.getItem("items")){
            const items = JSON.parse(localStorage.getItem("items"))
            this.setState({itemsInCart: items})
      }
      else if(user.data){
        this.setState({login: true})
      }
      
    }
    catch(err){
      console.log(err)
    }
  };

  /* When you sign in, SignIn.js will call the server to authenticate the
     username & password. If success, SignIn.js will store the token & userName
     to redux. App.js will store the token in local storage. The "token" name 
     should be unique, so it doesn't mix up with other local storage token. */

  componentDidUpdate(){

    if(this.props.token !== null){
      localStorage.setItem("token",this.props.token)
    }
  }
  
  state = {
      itemsInCart: [
        [
          {
            name: "Daily Tripple Dog special",
            price: 7.99,
            quantity: 0,
            picture: deal1
          }
        ],

        [
          {
            name: "Daily Plain Dog special",
            price: 5.99,
            quantity: 0,
            picture: deal2
          }
        ],

        [
          {
            name: "Daily Supreme Dog special",
            price: 4.99,
            quantity: 0,
            picture: deal3
          }
        ],

        [
          {
            name: "Daily Vocanal Burger spcl.",
            price: 6.99,
            quantity: 0,
            picture: deal7
          }
        ],

        [
          {
            name: "Daily Double Burger special",
            price: 3.99,
            quantity: 0,
            picture: deal8
          }
        ],

        [
          {
            name: "Daily Party Tray special",
            price: 9.99,
            quantity: 0,
            picture: deal9
          }
        ],

      [
        {
          name: "Mon. Happy hour special",
          price: 6.99,
          quantity: 0,
          picture: hour4
        }
      ],

      [
        {
          name: "Tue. Happy hour special",
          price: 3.99,
          quantity: 0,
          picture: hour5
        }
      ],

      [
        {
          name: "Wed. Happy hour special",
          price: 10.99,
          quantity: 0,
          picture: hour6
        }
      ],

      [
        {
          name: "Thur. Happy hour special",
          price: 5.99,
          quantity: 0,
          picture: hour10
        },
      ],

      [
        {
          name: "Fri. Happy hour special",
          price: 8.99,
          quantity: 0,
          picture: redwinepasta
        },
      ],

      // ** daily menu ** //
      [
        {
          name: "Slice of vegan pizza",
          price: 2.99,
          quantity: 0,
          picture: sliceOfVeganPizza
        }
      ],

      [
        {
          name: "Slice of cheese pizza",
          price: 2.99,
          quantity: 0,
          picture: sliceOfCheese
        }
      ],

      [
        {
          name: "Supreme hotdog",
          price: 3.99,
          quantity: 0,
          picture: supremeHotdog
        }
      ],

      [
        {
          name: "Kobei BBQ sauce burger",
          price: 5.99,
          quantity: 0,
          picture: kobeBurger
        }
      ],

      [
        {
          name: "Jumbo chili dog",
          price: 2.99,
          quantity: 0,
          picture: jumboChiliDog
        }
      ],

      [
        {
          name: "Fry mushroom",
          price: 1.49,
          quantity: 0,
          picture: fryMushroom
        }
      ],

      [
        {
          name: "Onion rings",
          price: 1.49,
          quantity: 0,
          picture: onionRings
        }
      ],

      [
        {
          name: "Apple juice",
          price: .99,
          quantity: 0,
          picture: appleJuice
        }
      ],

      [
        {
          name: "Ginger ale",
          price: 1.49,
          quantity: 0,
          picture: gingerAle
        }
      ],

      [
        {
          name: "Root beer float",
          price: 1.25,
          quantity: 0,
          picture: rootbeerFloat
        }
      ],
    ],

      token: "",
      login: false
  }

  // ** This will be call from SideMenu.js when the user logout ** //
  // ** this.state.itemsInCart will be reset. ** //
  resetItemsInCart = () => {
    
    let tempItemsInCart = this.state.itemsInCart;

    for(let i=0; i < tempItemsInCart.length; i++){
      tempItemsInCart[i][0].quantity = 0;
    }

    this.setState({itemsInCart: tempItemsInCart})
  }

  getOrders = () => {
    let orders={};
    let ordersArray = [];

    //You have to get the items from local storage, or else when
    //placeYourOrder.js do a items reset, 'orders' will also be set to zero.
    const itemsInCart = JSON.parse(localStorage.getItem('items'))

    if(itemsInCart !== null){
          //go through the whole itemsInCart & get items that has quantity larger than 1,
          //& put it in orders={}
          for(let i=0; i < itemsInCart.length; i++){
            if(itemsInCart[i][0].quantity > 0){
              ordersArray.push(itemsInCart[i][0])
            }
          }
          orders = {...ordersArray}
          return orders;
          }
  };

  // ** For special menu ** //
  addToCart = (props) => {
      for(let i=0; i < this.state.itemsInCart.length; i++){
          let tempQuantity = this.state.itemsInCart[i][0].quantity;
          let tempItemsInCart = this.state.itemsInCart;
          
          //check the selected menu item against the itemsInCart state. Increase that item by one if match.
          if(props.description[0] === this.state.itemsInCart[i][0].name){
              tempQuantity += 1;
              tempItemsInCart[i][0].quantity = tempQuantity;
             
              this.setState({itemsInCart: tempItemsInCart})
              localStorage.setItem('items', JSON.stringify(this.state.itemsInCart))
              break;
          }
      }
  };

  // ** For daily menu ** //
  add = (props) => {
      for(let i=0; i < this.state.itemsInCart.length; i++){
        let tempTotalQuantity = this.state.totalQuantity;
        let tempQuantity = this.state.itemsInCart[i][0].quantity;
        let tempItemsInCart = this.state.itemsInCart;
       
        // check the selected menu item against the itemsInCart state. 
        // Increase that item by one if match.
        if(props.id === this.state.itemsInCart[i][0].name){
            tempQuantity += 1;
            tempTotalQuantity += 1;
            tempItemsInCart[i][0].quantity = tempQuantity;
           
            this.setState({itemsInCart: tempItemsInCart})
            localStorage.setItem('items', JSON.stringify(this.state.itemsInCart))
            break;
        }
    }
  };

  // ** decrease the item quantity by 1 only ** //
  decrease = (item) => {
    let tempItemsInCart = this.state.itemsInCart;

    // Search the state itemsInCart[], & set the item quantity to zero.
    for(let i=0; i < tempItemsInCart.length; i++){
      if(tempItemsInCart[i][0].name === item && tempItemsInCart[i][0].quantity > 1){
        tempItemsInCart[i][0].quantity -= 1;
      };
    };
  
    this.setState({itemsInCart: tempItemsInCart});
    localStorage.setItem('items', JSON.stringify(this.state.itemsInCart));
  };

  // ** increase the item quantity by 1 only ** //
  increase = (item) => {
    let tempItemsInCart = this.state.itemsInCart;

    // Search the state itemsInCart[], & set the item quantity to zero.
    for(let i=0; i < tempItemsInCart.length; i++){
      if(tempItemsInCart[i][0].name === item){
        tempItemsInCart[i][0].quantity += 1;
      };
    };
  
    this.setState({itemsInCart: tempItemsInCart});
    localStorage.setItem('items', JSON.stringify(this.state.itemsInCart));
 };

  // ** remove item completely regardless of quantity ** //
  removeItem = (item) => {
      let tempItemsInCart = this.state.itemsInCart;

      // Search the state itemsInCart[], & set the item quantity to zero.
      for(let i=0; i < tempItemsInCart.length; i++){
        if(tempItemsInCart[i][0].name === item){
          tempItemsInCart[i][0].quantity = 0;
        };
      };
    
      this.setState({itemsInCart: tempItemsInCart});
      localStorage.setItem('items', JSON.stringify(this.state.itemsInCart));
  };

  getTotalQuantity = () => {
    let totalQuantity = 0;

     for(let i=0; i < this.state.itemsInCart.length; i++){
         if(this.state.itemsInCart[i][0].quantity > 0){
           totalQuantity += this.state.itemsInCart[i][0].quantity;
         }
     };

     return totalQuantity;
  };

  getTotalPrice = () => {
       let totalPrice = 0;
       let quantities = 0;

       // add up total price.
       for(let i=0; i < this.state.itemsInCart.length; i++){
        quantities = this.state.itemsInCart[i][0].quantity;

        if(quantities > 0){
            for( ; quantities > 0; quantities--){
               totalPrice += this.state.itemsInCart[i][0].price;
            };
        };
      };
      return totalPrice.toFixed(2);
  };

  getTaxes = () => {
       return (this.getTotalPrice() * 0.0925).toFixed(2);
  };
  
  getSubtotal = () => {
      let total = parseFloat(this.getTotalPrice());

       return (total + (total * 0.0925)).toFixed(2);
  };

  logout = () => {

    localStorage.clear(); 

    this.setState({
      login: false
    })

    this.props.resetToken();
    this.props.setUser("");;
    
  };

  login = () => {
      this.setState({
        login: true
      })
  }

  render(){
    let loading;

    if(this.props.loading){
      loading = (
        <SpinningCircle />
      )  
    }
   
    return (
         <div className={classes.App}>
           {loading}
            <Switch>
                <Route exact path="/" 
                          render = {() => <Layout state={this.state} getTotalQuantity={this.getTotalQuantity} 
                          addToCart={this.addToCart} add={this.add}
                          logout={() => this.logout()} resetItemsInCart={this.resetItemsInCart} />} />
                
               <Route path="/yourCart" render={() => <YourCart getOrders={this.getOrders} state={this.state} removeItem={this.removeItem} 
                                                        getTotalPrice={this.getTotalPrice} getTotalQuantity={this.getTotalQuantity} 
                                                        decrease={this.decrease} increase={this.increase} getTaxes={this.getTaxes} 
                                                        getSubtotal={this.getSubtotal} />} />
                                                         
               
               <Route path="/checkout" render={() => <Checkout />} />
               <Route path="/AboutUs" render={() => <AboutUs />} />
               <Route path="/memberRewards" render={() => <MemberRewards state={this.state}/>} />
               <Route path="/Orders" render={() => <Orders state={this.state}/>} />
               <Route path="/Profile" render={() => <Profile state={this.state}/>} />

               <Route path="/reviewOrder" render={() => <ReviewOrder state={this.state} getOrders={this.getOrders} getTotalPrice={this.getTotalPrice}
                                                         login={this.state.login} getTaxes={this.getTaxes}  getSubtotal={this.getSubtotal} />} />
               <Route path="/placeYourOrder" render={() => <PlaceYourOrder subTotal={this.getSubtotal()} resetItemsInCart={this.resetItemsInCart} /> } />
               <Route path="/createAccount" render={() => <CreateAccount login={() => this.login()} />} />
               <Route path="/signIn" render={() => <SignIn login={() => this.login()} />} />
            </Switch>
         </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
      token: state.token,
      loading: state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return{
       resetToken: () => dispatch({type: 'RESET'}),
       setUser: (user) => dispatch({type: 'SET-USER', value: user}),
       setLoading: (value) => dispatch({type: 'SET-LOADING', value: value})
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));



