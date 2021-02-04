
export const resetItemsInCart = (menuList) => {
    let tempItemsInCart = menuList;
  
    for(let i=0; i < tempItemsInCart.length; i++){
        tempItemsInCart[i][0].quantity = 0;
    }
    return tempItemsInCart;
  }

export default resetItemsInCart;



  