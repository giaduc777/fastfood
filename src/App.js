import React from 'react';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
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
import { getTotalQuantity } from './Functions/getTotalQuantity';

const App = () => {
  
  const dispatch = useDispatch()
  let reduxMenuList = useSelector(state => state.reduxMenuList);
  let menuList = reduxMenuList;

  useEffect(async () => {
   
    let myURL;
    try{
        if( process.env.NODE_ENV === 'production'){
            myURL = ADDRESS + '/api/user';
        }
        else {
            myURL = '/api/user';
        }
      
      let user = null;

      // ** if not true, then no token is stored in LS. User not login ** //
      if(localStorage.getItem("token")){
         user = await axios.post(myURL, {token: localStorage.getItem("token")});
      }

      if(user !== null){
          // ** init all user properties ** //
          dispatch({type: "INIT_USER", payload: user.data});
          dispatch({type: "SET_LOGIN"})

          if(localStorage.getItem("items")){
            const items = JSON.parse(localStorage.getItem("items"))
            dispatch({type: "SET_MENU_LIST", payload: items});
          }
    
      }
      else if(localStorage.getItem("items")){
        const items = JSON.parse(localStorage.getItem("items"))
        let totalQuantity = getTotalQuantity(items);
        dispatch({type: "SET_TOTAL_QUANTITY", value: totalQuantity});
        dispatch({type: "SET_MENU_LIST", payload: items});
      }
      
    }
    catch(err){
      console.log("Error from Ap.js: ", err)
    }
  },[]);


  // ** For special menu ** //
  const addToCart = (item) => {
      for(let i=0; i < menuList.length; i++){
          let tempItemsInCart = menuList;
          let tempQuantity = tempItemsInCart[i][0].quantity;
          
          // ** check the selected menu item against the itemsInCart state ** // 
          // ** Increase that item by one if match ** //
          if(item.description[0] === tempItemsInCart[i][0].name){
              tempQuantity += 1;
              tempItemsInCart[i][0].quantity = tempQuantity;
              dispatch({type: "SET_MENU_LIST", payload: tempItemsInCart});
              localStorage.setItem('items', JSON.stringify(tempItemsInCart))
              break;
          }
      }
      let totalQuantity = getTotalQuantity(menuList);
      dispatch({type: "SET_TOTAL_QUANTITY", value: totalQuantity});

  };

  // ** For daily menu ** //
  const add = (item) => {
      for(let i=0; i < menuList.length; i++){
        let tempItemsInCart = menuList;
        let tempQuantity = tempItemsInCart[i][0].quantity;
       
        // ** check the selected menu item against the itemsInCart state ** //
        // ** Increase that item by one if match ** //
        if(item.id === tempItemsInCart[i][0].name){
            tempQuantity += 1;
            tempItemsInCart[i][0].quantity = tempQuantity;
            dispatch({type: "SET_MENU_LIST", payload: tempItemsInCart});
            localStorage.setItem('items', JSON.stringify(tempItemsInCart))
            break;
        }
    }
  };

  // ** decrease the item quantity by 1 only ** //
  const decrease = (item) => {
    let tempItemsInCart = menuList;

    // ** Search the state itemsInCart[], & set the item quantity to zero ** //
    for(let i=0; i < tempItemsInCart.length; i++){
      if(tempItemsInCart[i][0].name === item && tempItemsInCart[i][0].quantity > 1){
         tempItemsInCart[i][0].quantity -= 1;
      };
    };

    //setItemsInCart({menuList: tempItemsInCart});
    dispatch({type: "SET_MENU_LIST", payload: tempItemsInCart});
    localStorage.setItem('items', JSON.stringify(tempItemsInCart));
  };

  // ** increase the item quantity by 1 only ** //
  const increase = (item) => {
    let tempItemsInCart = menuList;

    for(let i=0; i < tempItemsInCart.length; i++){
      if(tempItemsInCart[i][0].name === item){
         tempItemsInCart[i][0].quantity += 1;
      };
    };
    
    //setItemsInCart({menuList: tempItemsInCart});
    dispatch({type: "SET_MENU_LIST", payload: tempItemsInCart});
    localStorage.setItem('items', JSON.stringify(tempItemsInCart));
 };

  // ** remove item completely regardless of quantity ** //
  const removeItem = (item) => {
      let tempItemsInCart = menuList;

      // ** Search the state itemsInCart[], & set the item quantity to zero ** //
      for(let i=0; i < tempItemsInCart.length; i++){
        if(tempItemsInCart[i][0].name === item){
           tempItemsInCart[i][0].quantity = 0;
        };
      };
    
      //setItemsInCart({menuList: tempItemsInCart});
     dispatch({type: "SET_MENU_LIST", payload: tempItemsInCart});
      localStorage.setItem('items', JSON.stringify(tempItemsInCart));
  };
/*
  const getTotalQuantity = () => {
     let totalQuantity = 0;
    
     for(let i=0; i < menuList.length; i++){
         if(menuList[i][0].quantity > 0){
           totalQuantity += menuList[i][0].quantity;
         }
     };
     return totalQuantity;
  };
  */

  const getTotalPrice = () => {
       let totalPrice = 0;
       let quantities = 0;

       // ** add up total price ** //
       for(let i=0; i < menuList.length; i++){
          quantities = menuList[i][0].quantity;

          if(quantities > 0){
              for( ; quantities > 0; quantities--){
                totalPrice += menuList[i][0].price;
              };
          };
        };
        return totalPrice.toFixed(2);
  };

  const getTaxes = () => {
      return (getTotalPrice() * 0.0925).toFixed(2);
  };
  
  const getSubtotal = () => {
      let total = parseFloat(getTotalPrice());
      return (total + (total * 0.0925)).toFixed(2);
  };

  return (
         <div className={classes.App}>
            <Switch>
                <Route exact path="/" 
                          render = {() => <Layout addToCart={addToCart} add={add} />} />
                          {/*getTotalQuantity={getTotalQuantity}  */}
                
               <Route path="/yourCart" render={() => 
                      <YourCart state={menuList} removeItem={removeItem} 
                                getTotalPrice={getTotalPrice} getTotalQuantity={getTotalQuantity} 
                                decrease={decrease} increase={increase} getTaxes={getTaxes} 
                                getSubtotal={getSubtotal} />} />
                                                         
               
               <Route path="/checkout" render={() => <Checkout />} />
               <Route path="/AboutUs" render={() => <AboutUs />} />
               <Route path="/memberRewards" render={() => <MemberRewards state={menuList}/>} />
               <Route path="/Orders" render={() => <Orders state={menuList}/>} />
               <Route path="/Profile" render={() => <Profile state={menuList}/>} />

               <Route path="/reviewOrder" render={() => 
                      <ReviewOrder state={menuList} getTotalPrice={getTotalPrice}
                                                    getTaxes={getTaxes}  getSubtotal={getSubtotal} />} />
               <Route path="/placeYourOrder" render={() => 
                      <PlaceYourOrder getSubtotal={getSubtotal()} /> } />

               <Route path="/createAccount" render={() => <CreateAccount login={() => this.login()} />} />
               <Route path="/signIn" render={() => <SignIn login={() => this.login()} />} />
            </Switch>
         </div>
    );
}

export default withRouter(App);















