import React, { useState, useEffect } from 'react';
import { useShopify } from "../hooks";

export default (props) => {

    const {
        products,
		product,
		fetchProduct,
		openCart,
		checkoutState,
		addVariant,
	} = useShopify()

    // const id = props.match.params.productId
    const id = products[props.index] !== undefined ? products[props.index].id : "...Loading"
    const defaultSize = products[props.index] !== undefined ? products[props.index].variants[0].id.toString() : "...Loading"
    const [size, setSize] = useState("")
	const [quantity, setQuantity] = useState(1)
    const description = products[props.index] !== undefined ? products[props.index].description.split(".") : "...Loading"

    function changeSize(sizeId, quantity) {
		openCart()
		if (sizeId === "") {
			sizeId = defaultSize
			const lineItemsToAdd = [
				{ variantId: sizeId, quantity: parseInt(quantity, 10) },
			]
			const checkoutId = checkoutState.id
			addVariant(checkoutId, lineItemsToAdd)
		} else {
			const lineItemsToAdd = [
				{ variantId: sizeId, quantity: parseInt(quantity, 10) },
			]
			const checkoutId = checkoutState.id
			addVariant(checkoutId, lineItemsToAdd)
		}
	}

    //  //this doesn't work yet
	// useEffect(() => {
	// 	fetchProduct(id)
	// }, [id])

    return (
        <div>
            Product Modal
            <h1>{id}</h1>
            <h1>{defaultSize}</h1>
            <h1>{description}</h1>
        </div>
    )
}