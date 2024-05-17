const combineCartItems = (cartArray) => {
	// Using a map to group similar items
	const itemMap = cartArray.reduce((acc, item) => {
		// Create a unique key based on asin, color, and size
		const key = `${item.product.asin}-${item.color}-${item.size}`;
		if (!acc[key]) {
			// If the key doesn't exist in the map, create it with the initial item
			acc[key] = { ...item, quantity: parseInt(item.quantity, 10) };
		} else {
			// If the key exists, add the quantity to the existing item
			acc[key].quantity += parseInt(item.quantity, 10);
		}
		return acc;
	}, {});

	// Convert the map back into an array
	return Object.values(itemMap);
};

export default combineCartItems;
