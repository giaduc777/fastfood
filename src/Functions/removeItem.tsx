type menuList = {
  name: string;
  price: number;
  quantity: number;
  picture: any;
}[][];

export const removeItem = (item: string, menuList: menuList): menuList => {
    let tempItemsInCart = menuList;

    // ** Search the state itemsInCart[], & set the item quantity to zero ** //
    for(let i=0; i < tempItemsInCart.length; i++){
      if(tempItemsInCart[i][0].name === item){
         tempItemsInCart[i][0].quantity = 0;
      };
    };
  
    localStorage.setItem('items', JSON.stringify(tempItemsInCart));
    return tempItemsInCart;
};