type menuList = {
  name: string;
  price: number;
  quantity: number;
  picture: any;
}[][];

export const resetItemsInCart = (menuList: menuList): menuList => {
    let tempItemsInCart = menuList;
  
    for(let i=0; i < tempItemsInCart.length; i++){
        tempItemsInCart[i][0].quantity = 0;
    }
    return tempItemsInCart;
  }

export default resetItemsInCart;



  