import React, {Component} from 'react';
import classes from './Deal.module.scss';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class Deal extends Component{

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
                        onClick={() => this.props.addToCart(this.props)} >Add to cart</button>
                </div>
            </div>
        
    )
    }
}

const mapDispatchToProps = dispatch => {
    return{
         setLoading: (value) => dispatch({type: 'SET-LOADING', value: value})
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Deal));