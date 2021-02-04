import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Menu.module.scss';
import { add } from '../../../Functions/add';

const menu = props => {

    const dispatch = useDispatch();
    let state = useSelector(state => state);
    let reduxMenuList = state.menuList;
    let reduxTotalQuantity = state.totalQuantity;

    const callAdd = () => {
        const tempItemsInCart = add(props, reduxMenuList);

        if(tempItemsInCart){
            dispatch({type: "SET_MENU_LIST", payload: tempItemsInCart});
            dispatch({type: "SET_TOTAL_QUANTITY", value: reduxTotalQuantity + 1});
        }
    }

    return(
        <div className={`${styles.Menu}`}>
            <div className="row d-flex justify-content-center">
                <div className={`col-8  p-0 col-md-7 col-xl-6 mb-4 ${styles.dailyItemFontSize}`}>{props.menu}</div>
                <div className="col-2">
                    <button className="btn btn-sm btn-vanilla border border-dark text-black" onClick={() => callAdd(props)}>add</button>
                </div>
           </div>
        </div>
    )
}

export default menu;

