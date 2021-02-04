
export const increase = (item, menuList) => {
    let tempItemsInCart = menuList;

    // ** Search the state itemsInCart[], & increase the item by 1 ** //
    for(let i=0; i < tempItemsInCart.length; i++){
      if(tempItemsInCart[i][0].name === item){
         tempItemsInCart[i][0].quantity += 1;
      };
    };
    
    localStorage.setItem('items', JSON.stringify(tempItemsInCart));
    return tempItemsInCart;
};

    