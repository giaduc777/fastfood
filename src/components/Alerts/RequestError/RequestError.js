import React from 'react';
import styles from './RequestError.module.scss';

const requestError = (props) => {
    return(
        <div className={`${styles.RequestError} d-flex justify-content-center`}>
              <div class={`alert alert-primary d-flex flex-column p-0 m-0 col-10`} role="alert">
                  <div onClick={() => props.resetRequestError()} className={`align-self-end bg-warning  ${styles.x_button} badge`}>X</div>
                  <h5 className={`align-self-center mt-auto mb-auto text-center font-weight-bold font-italic p-3`}>{props.errorMessage}</h5>
              </div>
                                
        </div>
    )
}

export default requestError;