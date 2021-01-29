const getOrderHistory = (orders) => {
	let orderList=[];

		for( let i=0; i < orders.length; i++){
			orderList.push({
				order: Object.values(orders[i].items),
				time: orders[i]._id.getTimestamp().toString().slice(0,21),
				subTotal: orders[i].subTotal
			})
		}
		//console.log("from getOrderHistory >>> ", orderList)
	return orderList;
}

module.exports = getOrderHistory;