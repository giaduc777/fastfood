import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import useReactRouter from 'use-react-router';
import Axios from 'axios';
import {ADDRESS} from '../../herokuProxy';
import styles from './Orders.module.scss';
import RequestError from '../../components/Alerts/RequestError/RequestError';
import Backdrop from '../../components/Alerts/Backdrop/Backdrop';

const orders = () => {

    const {history} = useReactRouter();
    let reduxUserInfo = useSelector(state => state);

    const loadOrders = (orders) => {
        return orders.map( (result, resultIndex) => {
                let itemName = result.order.map( (value) => {
                    return value.name
                } );

                return (
                    <div className="border mb-3 p-3" key={resultIndex}>
                        <div className={`${styles.description} pb-2`}>{result.time}</div>
                            {
                                itemName.map((name, index) => {
                                    return <div key={index} className={`${styles.description}`}>{name}</div>
                                })
                            }
                        <div className={`${styles.description}`}>Sub Total: ${result.subTotal}</div>
                    </div>
                )
            }
        )
    };

    let Contents = null;
    let ordersHistory;
       
    if(reduxUserInfo.orderHistory === "" | reduxUserInfo.orderHistory.length === 0){
        ordersHistory = (
            <div className={`${styles.description}`}>You have no order history</div>
        )
    }
    
    else if(Object.keys(reduxUserInfo.orderHistory).length > 0){
        
            let orders = Object.values(reduxUserInfo.orderHistory);
        
            ordersHistory = (
                <div>
                    {loadOrders(orders)}
                </div>
            ) 
    }
        
    if(localStorage.getItem('token') !== null){
        Contents = (
            <div className={`${styles.Orders}`}>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <button className={`${styles.iconColor} navbar-toggler border`} type="button" data-toggle="collapse" data-target="#navbarNav">
                        <span className={"fa fa-bars"}></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link text-white" to='/memberRewards'>Rewards</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to='/Orders'>Orders</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to='/Profile'>Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to='/'>Home</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="mt-4 mb-5 row">
                    <div className="col-8 col-sm-6 col-md-4 bg-background m-auto container d-flex flex-column align-items-center">
                        <div className="title pt-4 pb-3">ORDERS HISTORY</div>
                        <div>
                            {ordersHistory} 
                        </div> 
                    </div>
                </div>
            </div>
        )
    }
    else{
        history.push('/');
    }
    
    return(
        <div>
            {Contents}
        </div>
    );
};

export default orders;


