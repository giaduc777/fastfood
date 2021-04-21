import React from 'react';
import styles from '../YourCart.module.scss';

type menuList = {
    name: string,
    price: number,
    picture: any,
    quantity: number
}[][];

type AppProps = {
     id: number,
     menuList: menuList,
     callDecrease: () => void,
     callIncrease: () => void,
     callRemoveItem: (item: string) => void,
     quantity: number
}

const top = (props: AppProps) => {
    return(
        <div>
            <li key={props.id}  className="container li d-flex flex-column align-items-center">  
                    <div className="col-md-7 col-lg-6 col-xl-5 mb-4">
                        <hr></hr>
                        <div className={`${styles.YourCart_topContainer} flex-column flex-sm-row`}>
                            <img className={`${styles.image}`} src={props.menuList[props.id][0].picture} alt="icon_picture"></img>
                            <div className={`${styles.nameAndPrice} col-12 col-sm-9 w-100`}>
                                <div>{props.menuList[props.id][0].name}</div>
                                <div>${props.menuList[props.id][0].price}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7 col-lg-6 col-xl-5 mb-4 row">
                        <div className="d-flex col-sm-6 align-items-center p-0 justify-content-center mb-2 mb-sm-0">
                            <div className="mr-3">Quantity: </div>
                            <div className={`${styles.YourCart_counterBox}`}><span className={`badge badge-light ${styles.box_size}`}>{props.menuList[props.id][0].quantity}</span></div>
                        </div>
                        <div className="d-flex col-sm-6 align-items-center justify-content-center">
                            <div className={`${styles.YourCart_counterBox} pr-3`} onClick={() => props.callDecrease()}><span className={`badge badge-light ${styles.box_size}`}>-</span></div>
                            <div className={`${styles.YourCart_counterBox}`} onClick={() => props.callIncrease()}><span className={`badge badge-light ${styles.box_size}`}>+</span></div>
                            <div className={`${styles.YourCart_counterBox} pl-3`} onClick={() => props.callRemoveItem(props.menuList[props.id][0].name)}><span className="badge badge-light">Remove</span></div>
                        </div>
                    </div>
            </li>
        </div>
    )
};

export default top;