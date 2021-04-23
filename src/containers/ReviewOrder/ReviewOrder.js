import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Axios from 'axios';
import {ADDRESS} from '../../herokuProxy';
import styles from './ReviewOrder.module.scss';
import { getOrders } from '../../Functions/getOrders';
import { getTotalPrice } from '../../Functions/getTotalPrice';
import { getTaxes } from '../../Functions/getTaxes';
import { getSubtotal } from '../../Functions/getSubtotal';
import { resetItemsInCart } from '../../Functions/resetItemsInCart';
import SpinningCircle from '../../components/SpinningCircle/SpinningCircle';
import functions from '../../Functions/Functions'; 
import useReactRouter from 'use-react-router';
import {useState} from 'react';

const reviewOrder = () => {
    const [spinCirState, setSpinCirState] = useState(false);
    const { history, location, match } = useReactRouter();
    const dispatch = useDispatch();
    
    const menuList = useSelector(state => state.menuList);
    const firstName = useSelector(state => state.firstName);
    const lastName = useSelector(state => state.lastName);
    const email = useSelector(state => state.email);
    const phone = useSelector(state => state.phone);
    const token = localStorage.getItem("token");
    const items = functions.getOrders();
    const rewardPoints = Math.round(getSubtotal(menuList));
    const subTotal = getSubtotal(menuList);

    let placeOrder = async () => {
        setSpinCirState({spinningCircleState: true});
        let myURL;

        if( process.env.NODE_ENV === 'production'){
            myURL = ADDRESS + '/api/placeOrder';
        }
        else {
            myURL = '/api/placeOrder';
        }
        
        try{
            // ** send current order to Mongo-Atlas ** //
            const status = await Axios.post(myURL, {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                token: token,
                items: items,
                rewardPoints: rewardPoints,
                subTotal: subTotal
            }); 
            
            // ** When order is place and user is login, retrieve ** //
            // ** the latest order info. from  mongo atlas, and ** //
            // ** put it in redux. ** //
            if(localStorage.getItem("token")){
               try{
                    let myURL;
            
                    if( process.env.NODE_ENV === 'production'){
                        myURL = ADDRESS + '/api/user';
                    }
                    else {
                        myURL = '/api/user';
                    }
                
                    // ** if user is not true, that's mean no token is stored in LS. User not login. ** //
                    let user = null;
                    user = await Axios.post(myURL, {token: localStorage.getItem("token")});
                    
                    if(user !== null){
                        dispatch({type: 'INIT_USER', payload: user.data});
                    }
                    
                }
                catch(err){
                    console.log("From ReviewOrder.placeOder(): ", err)
                }
            }

            setSpinCirState({spinningCircleState: false});
            dispatch({type: "SET_TOTAL_QUANTITY", value: 0});
            dispatch({type: "SET_SUBTOTAL", value: getSubtotal(menuList)});
            dispatch({type: "SET_MENU_LIST", payload: resetItemsInCart(menuList)})
            history.push('/placeYourOrder');
        }
         catch(err){
            console.log("From ReviewOrder.placeOder(): ", err);
        }
    };
    
    let itemsArr = [];
    let orders = functions.getOrders();
    let spinningCircle;

    if(spinCirState){
        spinningCircle = (<SpinningCircle />)
    }
    
    if(Object.keys(orders).length !== 0){
        for(let i=0; i < Object.keys(orders).length; i++){
            itemsArr.push(
                <div key={i} className={`${styles.ReviewOrder}`}>
                    <li className={`${styles.item}`}>  
                        <div>
                            <hr></hr>
                            <div className="d-sm-flex justify-content-sm-between">
                                <div ><img className={`${styles.image} mb-3 border`} src={orders[i][0].picture} alt="icon_picture"></img></div>
                                <div className="mb-2 pl-sm-4 pr-sm-4">{orders[i][0].name}</div>
                                <div >${orders[i][0].price}</div>
                            </div>
                        </div>
                        <div className="d-flex mt-3">
                            <div className="mr-3">Quantity: </div>
                            <div ><span className="badge badge-light" style={{fontSize:"1rem"}}>{orders[i][0].quantity}</span></div>
                        </div>
                    </li>
                </div>
            );
        };
    }

    return(
        <div className={`${styles.ReviewOrder} bg-background mt-5 ml-auto mr-auto p-0 d-flex flex-column col-10 col-md-8 col-lg-6`}>
            {spinningCircle}
            <div className="align-self-end genericClasses"><Link to="/"><span className="badge x-button">X</span></Link></div>
            <div className="p-4">
                <div >
                    <h3>You're Almost Done !</h3>
                    <h5>Just make sure the information below is correct & place your order.</h5>
                </div>
                <hr></hr>
                <div className="border p-3">
                    <h5>Contact & Payment Information</h5>
                    <div >{firstName} {lastName}</div>
                    <div className="text-break">{email}</div>
                    <div >{phone}</div>
                    <div ><i>Payment Method</i>: CREDIT</div>
                    <a href="#">Edit Contact & Payment Information</a>
                </div>
                <hr></hr>
                <div className="border p-3">
                    <h4>Your Carry Out Store</h4>
                    <div>
                        <div>555 Your favorite place Ave</div>
                        <div>San jose, Ca, 95009</div>
                        <div>(555) 555-5555</div>
                        <div>Today's Hours</div>
                        <div>10:00 a.m  to  09:00 p.m</div>
                    </div>
                </div>
                <div className="d-flex flex-column border mt-4">
                    <div className=" col-sm-9 col-lg-7 m-auto">
                        <h3 className="text-center mt-5">Your Cart</h3>
                        {itemsArr}
                    </div>
                    <div className="col-10 m-auto">
                        <hr></hr>
                        <div className={`${styles.button}`}>
                            <button onClick={() => placeOrder()} className={`${styles.placeYourOrder}`}>Place Your Order</button>
                        </div>
                        <div className="col-sm-7 col-lg-5 m-auto p-0">
                            <div className="d-flex justify-content-between h6"><div>Total:</div><span>{getTotalPrice(menuList)}</span></div>
                            <div className="d-flex justify-content-between h6">Tax:<span>{getTaxes(menuList)}</span></div>
                            <div className="d-flex justify-content-between h6">Subtotal:<span>{getSubtotal(menuList)}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default reviewOrder;

