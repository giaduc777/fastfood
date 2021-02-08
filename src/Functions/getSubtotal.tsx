type menuList = {
    name: string;
    price: number;
    quantity: number;
    picture: any;
}[][];

import { getTotalPrice } from './getTotalPrice';

export const getSubtotal = (menuList: menuList): string => {
    let total = parseFloat(getTotalPrice(menuList));
    return (total + (total * 0.0925)).toFixed(2);
};