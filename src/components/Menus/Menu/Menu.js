import React from 'react';
import styles from './Menu.module.scss';

const menu = props => {
    return(
        <div className={`${styles.Menu}`}>
            <div className="row d-flex justify-content-center">
                <div className={`col-8  p-0 col-md-7 col-xl-6 mb-4 ${styles.dailyItemFontSize}`}>{props.menu}</div>
                <div className="col-2">
                    <button className="btn btn-sm btn-vanilla border border-dark text-black" onClick={() => props.add(props)}>add</button>
                </div>
           </div>
        </div>
    )
}

export default menu;

