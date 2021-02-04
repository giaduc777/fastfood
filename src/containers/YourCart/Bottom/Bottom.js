import React from 'react';
import { getTotalPrice } from '../../../Functions/getTotalPrice';
import { getTaxes } from '../../../Functions/getTaxes';
import { getSubtotal } from '../../../Functions/getSubtotal';

const bottom = (props) => {
    return (
        <div>
            {props.items}
            <div>
                <hr></hr>
                {props.children}
                <div className="col-sm-8 col-md-7 col-lg-4 m-auto">
                    <div className="border pb-3 mt-3 mb-3">
                        <h3 className="p-2">Total in cart: {props.reduxTotalQuantity}</h3>
                        <div className="d-flex justify-content-between pl-2 pr-2"><h6>Total:</h6><h6>{getTotalPrice(props.reduxMenuList)}</h6></div>
                        <div className="d-flex justify-content-between pl-2 pr-2"><h6>Tax:</h6><h6>{getTaxes(props.reduxMenuList)}</h6></div>
                        <div className="d-flex justify-content-between pl-2 pr-2"><h6>Subtotal:</h6><h6>{getSubtotal(props.reduxMenuList)}</h6></div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default bottom;