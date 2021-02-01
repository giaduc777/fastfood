
export const getTotalQuantity = (menuList) => {

    let totalQuantity = 0;
   
    for(let i=0; i < menuList.length; i++){
        if(menuList[i][0].quantity > 0){
          totalQuantity += menuList[i][0].quantity;
        }
    };
    //console.log("from get total>>>", totalQuantity)
    return totalQuantity;
 };