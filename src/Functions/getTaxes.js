
import { getTotalPrice } from '../Functions/getTotalPrice';

export const getTaxes = (menuList) => {
    return (getTotalPrice(menuList) * 0.0925).toFixed(2);
};
