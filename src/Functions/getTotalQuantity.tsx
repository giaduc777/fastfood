type menuList = {
  name: string;
  price: number;
  quantity: number;
  picture: any;
}[][];

export const getTotalQuantity = (menuList: menuList): number => {
    let totalQuantity = 0;
   
    for(let i=0; i < menuList.length; i++){
        if(menuList[i][0].quantity > 0){
          totalQuantity += menuList[i][0].quantity;
        }
    };
    return totalQuantity;
 };