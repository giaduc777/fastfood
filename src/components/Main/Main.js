import React from 'react';
import styles from './Main.module.scss';
import storefront_800_compress from '../../../src/asset/background_800_compress/storefront_800.jpg';
import storefront from '../../../src/asset/background_3800_compress/storefront.jpg';

const main = props => {
    return(
       <div className={styles.Main}>
           <img className="img-fluid" style={{height: "100%", width: "100%"}} srcSet={`${storefront}, ${storefront_800_compress} 1300w`} alt="img-fluid"></img>
       </div>
    )
}

export default main;