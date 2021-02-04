import React, {Component} from 'react';
import classes from './Deal.module.scss';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { addToCart } from '../../../Functions/addToCart';

class Deal extends Component{

    callAddToCart = () => {
        const tempItemsInCart = addToCart(this.props, this.props.reduxMenuList);

        if(tempItemsInCart){
            this.props.setMenuList(tempItemsInCart);
            this.props.setTotalQuantity(this.props.reduxTotalQuantity);
        }
    }

    render(){
        return(
            <div className={classes.Deal}>
                <div>
                    <img className={`${classes.image}`} src={this.props.deal} alt="deal"></img>
                    <h3>{this.props.description[0]}</h3>
                    <div className="display-6 p-3">{this.props.description[1]}</div>
                    <h3>{this.props.description[2]}</h3>
                </div>  
                <div>
                    <button className="btn btn-md btn-sunsetOrange mb-3 text-vanilla" 
                            onClick={() => this.callAddToCart()} >Add to cart</button>
                </div>
            </div> 
        )
    }
}

const mapStateToProps = state => {
    return {
      reduxMenuList: state.menuList,
      reduxTotalQuantity: state.totalQuantity
    }
}

const mapDispatchToProps = dispatch => {
    return{
         setMenuList: (tempItemsInCart) => dispatch({type: "SET_MENU_LIST", payload: tempItemsInCart}),
         setTotalQuantity: (quantity) => dispatch({type: "SET_TOTAL_QUANTITY", value: quantity + 1}),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Deal));