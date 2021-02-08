import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './YourCart.module.scss';
import functions from '../Functions/Functions';
import Top from '../containers/YourCart/Top/Top';
import Cart from '../containers/YourCart/Cart/Cart';

export const YourCart = () => {
       
    // ** Hook to redux-store ** //
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    
    // ** Redux-state ** //
    let reduxLogin = state.login;
    let reduxTotalQuantity = state.totalQuantity;
    let reduxMenuList = state.menuList

    // ** Decrease quantity by 1 ** //
    const callDecrease = (item) => {
        const tempItemsInCart = functions.decrease(item, reduxMenuList);

        if(tempItemsInCart){
            dispatch({type: "SET_MENU_LIST", payload: tempItemsInCart});

            if(reduxTotalQuantity > 1){
                dispatch({type: "SET_TOTAL_QUANTITY", value: reduxTotalQuantity - 1});
            }
        }
    };

    // ** Increase quantity by 1 ** //
    const callIncrease = (item) => {
        const tempItemsInCart = functions.increase(item, reduxMenuList);

        if(tempItemsInCart){
            dispatch({type: "SET_MENU_LIST", payload: tempItemsInCart});
            dispatch({type: "SET_TOTAL_QUANTITY", value: (reduxTotalQuantity + 1)});
        }
    };
   
    // ** Remove the whole item ** //
    const callRemoveItem = (item) => {
        const tempItemsInCart = functions.removeItem(item, reduxMenuList);

        if(tempItemsInCart){
            let totalQuantity = functions.getTotalQuantity(tempItemsInCart);
            dispatch({type: "SET_TOTAL_QUANTITY", value: totalQuantity});
            dispatch({type: "SET_MENU_LIST", payload: tempItemsInCart});
        }
    };

    let items = [];
    let orders = functions.getOrders();

    // ** If there's at least 1 item in cart ** //
    if(orders !== undefined && Object.keys(orders).length !== 0){
        for(let i=0; i < Object.keys(orders).length; i++){   
            items.push(
                <Top key={i} orders={orders[i]} 
                     callDecrease={() => callDecrease(orders[i].name)} 
                     callIncrease={() => callIncrease(orders[i].name)} 
                     callRemoveItem={() => callRemoveItem(orders[i].name)} />
            );
        };
    }

    return(
        <div className="container text-center">
            <div className="bg-background border rounded mt-3 mb-3">
                <h3 className="pt-4">Your cart</h3>
                <Cart orders={orders} items={items} reduxTotalQuantity={reduxTotalQuantity} 
                      reduxLogin={reduxLogin} reduxMenuList={reduxMenuList} />
            </div>
        </div>
    );
};


 


