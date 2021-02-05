import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './YourCart.module.scss';
import Top from './Top/Top';
import Bottom from './Bottom/Bottom';
import functions from '../../Functions/Functions';

export const YourCart = () => {
       
        const dispatch = useDispatch();
        const state = useSelector(state => state);
        
        let reduxLogin = state.login;
        let reduxTotalQuantity = state.totalQuantity;
        let reduxMenuList = state.menuList
   
        const callDecrease = (item) => {
            const tempItemsInCart = functions.decrease(item, reduxMenuList);

            if(tempItemsInCart){
                dispatch({type: "SET_MENU_LIST", payload: tempItemsInCart});

                if(reduxTotalQuantity > 1){
                    dispatch({type: "SET_TOTAL_QUANTITY", value: reduxTotalQuantity - 1});
                }
            }
        };

        const callIncrease = (item) => {
            console.log("call inc.....", item)
            const tempItemsInCart = functions.increase(item, reduxMenuList);

            if(tempItemsInCart){
                dispatch({type: "SET_MENU_LIST", payload: tempItemsInCart});
                dispatch({type: "SET_TOTAL_QUANTITY", value: (reduxTotalQuantity + 1)});
            }
        };

        const callRemoveItem = (item) => {
            const tempItemsInCart = functions.removeItem(item, reduxMenuList);

            if(tempItemsInCart){
                let totalQuantity = functions.getTotalQuantity(tempItemsInCart);
                dispatch({type: "SET_TOTAL_QUANTITY", value: totalQuantity});
                dispatch({type: "SET_MENU_LIST", payload: tempItemsInCart});
            }
        };

        let items = [];
        let Cart;
        let orders = functions.getOrders()

        let checkOut = (
             <div className={`${styles.YourCart_checkOut}`}>
                 <Link  className={`${styles.pillButton}`} to='/'><span className="badge badge-pill badge-info">Go Back</span></Link>
                 <Link className={`${styles.pillButton}`} to='/checkout'><span className="badge badge-pill badge-info">Check Out</span></Link>
             </div>
        )

        if(orders !== undefined && Object.keys(orders).length !== 0){
                for(let i=0; i < Object.keys(orders).length; i++){
                    items.push(
                        <Top key={i} orders={orders[i]} 
                             callDecrease={() => callDecrease(orders[i].name)} 
                             callIncrease={() => callIncrease(orders[i].name)} 
                             callRemoveItem={() => callRemoveItem(orders[i].name)} />
                    );
                };
          
            if(!reduxLogin){
                checkOut = (
                    <div className={`${styles.YourCart_checkOut}`}>
                        <Link className={`${styles.pillButton}`} to='/'><span className="badge badge-info">Go Back</span></Link>
                        <Link className={`${styles.pillButton}`} to='/checkout'><span className="badge badge-info">Check out as Guess</span></Link>
                        <Link className={`${styles.pillButton}`} to='/SignIn'><span className="badge badge-info">Sign In to Check out</span></Link>
                    </div>
                )
            }

            Cart = (
                <Bottom items={items} reduxTotalQuantity={reduxTotalQuantity} reduxMenuList={reduxMenuList} >
                    {checkOut}
                </Bottom>
            )
        }
        else{
            Cart = (
                <div>
                    <h2>Your cart is empty...</h2>
                    <div ><Link className="btn btn-deepSky text-white m-4" to='/'>Home</Link></div>
                </div>
            )
        };

        return(
            <div className="container text-center">
                <div className="bg-background border rounded mt-3 mb-3">
                    <h3 className="pt-4">Your cart</h3>
                    {Cart}
                </div>
            </div>
        );
};


 


