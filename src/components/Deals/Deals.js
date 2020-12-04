import React from 'react';
import Deal from '../Deals/Deal/Deal';
import classes from './Deals.module.scss';

const deals = props => {
   
   let descriptionName = props.descriptionName;
   let name = props.name;
   let items=[];
  
   for(let i=0; i < props[name].length; i++){
       items.push(<Deal deal={props[name][i]} addToCart={props.addToCart}
                   description={props[descriptionName][i]} key={i} id={i}></Deal>)
   }
    
   if(props.name === "happyHours"){
      return(
         <div className={classes.Deals_happyHours}> 
            {items}
         </div>
     )
   }
   else{
      return(
         <div className={classes.Deals}> 
            {items}
         </div>
     )
   }
}

export default deals;