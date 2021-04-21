import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../YourCart.module.scss';

type AppProps = {
    reduxLogin: boolean
}

const checkoutSection = (props: AppProps) => {

    let checkOutComponent;

    /** If user is a guess, not login */
    if(!props.reduxLogin){
        checkOutComponent = (
            <div className={`${styles.YourCart_checkOut}`}>
                <Link className={`${styles.pillButton}`} to='/'><span className="badge badge-info">Go Back</span></Link>
                <Link className={`${styles.pillButton}`} to='/checkout'><span className="badge badge-info">Check out as Guess</span></Link>
                <Link className={`${styles.pillButton}`} to='/SignIn'><span className="badge badge-info">Sign In to Check out</span></Link>
            </div>
        );
    }
    /** If user is login */
    else(
        checkOutComponent = (
            <div className={`${styles.YourCart_checkOut}`}>
                <Link  className={`${styles.pillButton}`} to='/'><span className="badge badge-pill badge-info">Go Back</span></Link>
                <Link className={`${styles.pillButton}`} to='/checkout'><span className="badge badge-pill badge-info">Check Out</span></Link>
            </div>
        )
    );
    return checkOutComponent;
}

export default checkoutSection;