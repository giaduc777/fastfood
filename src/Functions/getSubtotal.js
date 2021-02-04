import { getTotalPrice } from '../Functions/getTotalPrice';

export const getSubtotal = (menuList) => {
    let total = parseFloat(getTotalPrice(menuList));
    return (total + (total * 0.0925)).toFixed(2);
};