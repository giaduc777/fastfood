type menuList = {
    name: string;
    price: number;
    quantity: number;
    picture: any;
}[][];

type itemType = {
    description: string
}


export const addToCart = (item: itemType, menuList: menuList): menuList => {
    for(let i=0; i < menuList.length; i++){
        let tempQuantity = menuList[i][0].quantity;
        
        // ** check the selected menu item against the itemsInCart state ** // 
        // ** Increase that item by one if match ** //
        if(item.description[0] === menuList[i][0].name){
            tempQuantity += 1;
            menuList[i][0].quantity = tempQuantity;
            localStorage.setItem('items', JSON.stringify(menuList));
            break;
        }
    }
    return menuList;
};