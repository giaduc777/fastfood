import React from 'react';
import classes from './SpinningCircle.module.scss';

const spinningCircle = props => {
     return(
     <div className={classes.SpinningCircle}>
        <div className={classes.frame}>
          <div className={classes.circle}></div>
          <div className={classes.loading}>Loading...</div>
        </div>

    </div>
     )
}

export default spinningCircle;