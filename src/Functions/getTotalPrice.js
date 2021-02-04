
export const getTotalPrice = (menuList) => {
    let totalPrice = 0;
    let quantities = 0;

    // ** add up total price ** //
    for(let i=0; i < menuList.length; i++){
       quantities = menuList[i][0].quantity;

       if(quantities > 0){
           for( ; quantities > 0; quantities--){
             totalPrice += menuList[i][0].price;
           };
       };
     };
     return totalPrice.toFixed(2);
};