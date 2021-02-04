import React from 'react';
import styles from '../YourCart.module.scss';

const top = (props) => {
    return(
        <div>
            <li key={props.i} className="container li d-flex flex-column align-items-center">  
                    <div className="col-md-7 col-lg-6 col-xl-5 mb-4">
                        <hr></hr>
                        <div className={`${styles.YourCart_topContainer} flex-column flex-sm-row`}>
                            <img className={`${styles.image}`} src={props.orders.picture} alt="icon_picture"></img>
                            <div className={`${styles.nameAndPrice} col-12 col-sm-9 w-100`}>
                                <div>{props.orders.name}</div>
                                <div>${props.orders.price}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7 col-lg-6 col-xl-5 mb-4 row">
                        <div className="d-flex col-sm-6 align-items-center p-0 justify-content-center mb-2 mb-sm-0">
                            <div className="mr-3">Quantity: </div>
                            <div className={`${styles.YourCart_counterBox}`}><span className={`badge badge-light ${styles.box_size}`}>{props.orders.quantity}</span></div>
                        </div>
                        <div className="d-flex col-sm-6 align-items-center justify-content-center">
                            <div className={`${styles.YourCart_counterBox} pr-3`} onClick={() => props.callDecrease()}><span className={`badge badge-light ${styles.box_size}`}>-</span></div>
                            <div className={`${styles.YourCart_counterBox}`} onClick={() => props.callIncrease()}><span className={`badge badge-light ${styles.box_size}`}>+</span></div>
                            <div className={`${styles.YourCart_counterBox} pl-3`} onClick={() => props.callRemoveItem(props.orders.name)}><span className="badge badge-light">Remove</span></div>
                        </div>
                    </div>
            </li>
        </div>
    )
};

export default top;