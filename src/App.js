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
import { YourCart } from './containers/YourCart/YourCart';
import Checkout from './containers/Checkout/Checkout';
import AboutUs from './containers/AboutUs/AboutUs';
import SignIn from './containers/SignIn/SignIn';
import MemberRewards from './containers/MemberRewards/MemberRewards';
import Orders from './containers/Orders/Orders';
import Profile from './containers/Profile/Profile';
import {ReviewOrder} from './containers/ReviewOrder/ReviewOrder';
import PlaceYourOrder from './containers/PlaceYourOrder/PlaceYourOrder';
import CreateAccount from './containers/CreateAccount/CreateAccount';

import SpinningCircle from './components/SpinningCircle/SpinningCircle';
import { getTotalQuantity } from './Functions/getTotalQuantity';
import { getTotalPrice } from './Functions/getTotalPrice';

const App = () => {
  const dispatch = useDispatch()
  let state = useSelector(state => state);
  let reduxMenuList = state.menuList;
  let reduxTotalQuantity = state.totalQuantity;

  // ** useEffect() only run once on component first mount ** //
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
            const items = JSON.parse(localStorage.getItem("items"));
            let totalQuantity = getTotalQuantity(items);
            dispatch({type: "SET_TOTAL_QUANTITY", value: totalQuantity});
            dispatch({type: "SET_MENU_LIST", payload: items});
          }
      }
      // ** user is a guess ** //
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
  }, []);
  
  return (
         <div className={classes.App}>
            <Switch>
                <Route exact path="/" 
                          render = {() => <Layout />} />
                
               <Route path="/yourCart" render={() => 
                      <YourCart state={reduxMenuList} />} />
                                                         
               <Route path="/checkout" render={() => <Checkout />} />
               <Route path="/AboutUs" render={() => <AboutUs />} />
               <Route path="/memberRewards" render={() => <MemberRewards state={reduxMenuList}/>} />
               <Route path="/Orders" render={() => <Orders state={reduxMenuList}/>} />
               <Route path="/Profile" render={() => <Profile state={reduxMenuList}/>} />

               <Route path="/reviewOrder" render={() => 
                      <ReviewOrder state={reduxMenuList} />} />
               <Route path="/placeYourOrder" render={() => 
                      <PlaceYourOrder /> } />

               <Route path="/createAccount" render={() => <CreateAccount />} />
               <Route path="/signIn" render={() => <SignIn />} />
            </Switch>
         </div>
    );
}

export default withRouter(App);















