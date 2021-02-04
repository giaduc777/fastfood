import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getOrders } from '../../Functions/getOrders';
import { decrease } from '../../Functions/decrease';
import { increase } from '../../Functions/increase';
import { getTotalQuantity } from '../../Functions/getTotalQuantity';
import { removeItem } from '../../Functions/removeItem';
import { getTotalPrice } from '../../Functions/getTotalPrice';
import { getTaxes } from '../../Functions/getTaxes';
import { getSubtotal } from '../../Functions/getSubtotal';
import styles from './YourCart.module.scss';

class YourCart extends Component {
   
    callDecrease = (item) => {
       const tempItemsInCart = decrease(item, this.props.reduxMenuList);

       if(tempItemsInCart){
            this.props.setMenuList(tempItemsInCart);

            if(this.props.reduxTotalQuantity > 1){
                this.props.setTotalQuantity(this.props.reduxTotalQuantity - 1);
            }
        }
    };

    callIncrease = (item) => {
        const tempItemsInCart = increase(item, this.props.reduxMenuList);

        if(tempItemsInCart){
            this.props.setMenuList(tempItemsInCart);
            this.props.setTotalQuantity(this.props.reduxTotalQuantity + 1);
        }
    };

    callRemoveItem = (item) => {
        const tempItemsInCart = removeItem(item, this.props.reduxMenuList);

        if(tempItemsInCart){
            let totalQuantity = getTotalQuantity(tempItemsInCart);
            this.props.setTotalQuantity(totalQuantity);
            this.props.setMenuList(tempItemsInCart);
        }
    };

    render(){
        let items = [];
        let Cart;
        let orders = getOrders();

        let checkOut = (
             <div className={`${styles.YourCart_checkOut}`}>
                 <Link  className={`${styles.pillButton}`} to='/'><span className="badge badge-pill badge-info">Go Back</span></Link>
                 <Link className={`${styles.pillButton}`} to='/checkout'><span className="badge badge-pill badge-info">Check Out</span></Link>
             </div>
        )

        if(orders !== undefined && Object.keys(orders).length !== 0){
                for(let i=0; i < Object.keys(orders).length; i++){
                    items.push(
                        <li key={i} className="container li d-flex flex-column align-items-center">  
                            <div className="col-md-7 col-lg-6 col-xl-5 mb-4">
                                <hr></hr>
                                <div className={`${styles.YourCart_topContainer} flex-column flex-sm-row`}>
                                    <img className={`${styles.image}`} src={orders[i].picture} alt="icon_picture"></img>
                                    <div className={`${styles.nameAndPrice} col-12 col-sm-9 w-100`}>
                                        <div>{orders[i].name}</div>
                                        <div>${orders[i].price}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7 col-lg-6 col-xl-5 mb-4 row">
                                <div className="d-flex col-sm-6 align-items-center p-0 justify-content-center mb-2 mb-sm-0">
                                    <div className="mr-3">Quantity: </div>
                                    <div className={`${styles.YourCart_counterBox}`}><span className={`badge badge-light ${styles.box_size}`}>{orders[i].quantity}</span></div>
                                </div>
                                <div className="d-flex col-sm-6 align-items-center justify-content-center">
                                    <div className={`${styles.YourCart_counterBox} pr-3`} onClick={() => this.callDecrease(orders[i].name)}><span className={`badge badge-light ${styles.box_size}`}>-</span></div>
                                    <div className={`${styles.YourCart_counterBox}`} onClick={() => this.callIncrease(orders[i].name)}><span className={`badge badge-light ${styles.box_size}`}>+</span></div>
                                    <div className={`${styles.YourCart_counterBox} pl-3`} onClick={() => this.callRemoveItem(orders[i].name)}><span className="badge badge-light">Remove</span></div>
                                </div>
                            </div>
                           
                        </li>
                    );
                };
          
            if(!this.props.reduxLogin){
                checkOut = (
                    <div className={`${styles.YourCart_checkOut}`}>
                        <Link className={`${styles.pillButton}`} to='/'><span className="badge badge-info">Go Back</span></Link>
                        <Link className={`${styles.pillButton}`} to='/checkout'><span className="badge badge-info">Check out as Guess</span></Link>
                        <Link className={`${styles.pillButton}`} to='/SignIn'><span className="badge badge-info">Sign In to Check out</span></Link>
                    </div>
                )
            }

            Cart = (
                <div>
                    {items}
                    <div>
                        <hr></hr>
                        <div>{checkOut}</div>
                        <div className="col-sm-8 col-md-7 col-lg-4 m-auto">
                            <div className="border pb-3 mt-3 mb-3">
                                <h3 className="p-2">Total in cart: {this.props.reduxTotalQuantity}</h3>
                                <div className="d-flex justify-content-between pl-2 pr-2"><h6>Total:</h6><h6>{getTotalPrice(this.props.reduxMenuList)}</h6></div>
                                <div className="d-flex justify-content-between pl-2 pr-2"><h6>Tax:</h6><h6>{getTaxes(this.props.reduxMenuList)}</h6></div>
                                <div className="d-flex justify-content-between pl-2 pr-2"><h6>Subtotal:</h6><h6>{getSubtotal(this.props.reduxMenuList)}</h6></div>
                            </div>
                        </div>
                    </div>
                </div>
            );
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
};

const mapStateToProps = state => {
    return {
        reduxLogin: state.login,
        reduxTotalQuantity: state.totalQuantity,
        reduxMenuList: state.menuList
    }
}

const mapDispatchToProps = dispatch => {
    return{
         setMenuList: (tempItemsInCart) => dispatch({type: "SET_MENU_LIST", payload: tempItemsInCart}),
         setTotalQuantity: (quantity) => dispatch({type: "SET_TOTAL_QUANTITY", value: quantity}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(YourCart);


 


