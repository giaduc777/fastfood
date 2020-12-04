import React, {Component} from 'react';
import classes from './ErrorRoute.css';
import {Link} from 'react-router-dom';

class ErrorRoute extends Component{
    render(){
        return(
           <div className={classes.ErrorRoute}>
               <h3>Error finding route...</h3>
               <div><Link className={classes.back} to="/">Back</Link></div>
           </div>
        );
    };
}

export default ErrorRoute;