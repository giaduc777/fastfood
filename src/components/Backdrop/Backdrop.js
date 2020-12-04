import React from 'react';
import classes from './Backdrop.module.scss';

const backdrop = (props) => {
    return(
        <div className={classes.Backdrop} onClick={() => props.closeSideMenu()}></div>
    )
}

export default backdrop;