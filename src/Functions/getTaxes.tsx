type menuList = {
    name: string;
    price: number;
    quantity: number;
    picture: any;
  }[][];

import { getTotalPrice } from './getTotalPrice';

export const getTaxes = (menuList: menuList): string => {
    return ( +getTotalPrice(menuList) * 0.0925).toFixed(2);
};
