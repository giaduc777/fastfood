import React from 'react';
import { Link } from 'react-router-dom';
import Bottom from '../Bottom/Bottom';
import CheckoutSection from '../CheckoutSection/CheckoutSection'; 

const cart = (props) => {

    let Cart;

    // ** If there's at least 1 item in cart ** //
    if(props.orders !== undefined && Object.keys(props.orders).length !== 0){
         Cart = (
            <Bottom items={props.items} reduxTotalQuantity={props.reduxTotalQuantity} 
                    reduxMenuList={props.reduxMenuList} >
                    <CheckoutSection reduxLogin={props.reduxLogin} />
            </Bottom>
         )
    }
    // ** If cart is empty ** //
    else(
        Cart = (
            <div>
                <h2>Your cart is empty...</h2>
                <div ><Link className="btn btn-deepSky text-white m-4" to='/'>Home</Link></div>
            </div>
        )
    )
    return Cart;
}

export default cart;