import React from 'react';
import classes from './Navigation.module.scss';

const navigation = (props) => {
    return(
        <div className={`${classes.Navigation}`}>
            {props.children}
        </div>
    )
}

export default navigation;