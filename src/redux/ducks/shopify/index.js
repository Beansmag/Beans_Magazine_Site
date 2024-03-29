import { useSelector, useDispatch } from "react-redux"
import Client from "shopify-buy/index.unoptimized.umd"

  const client = Client.buildClient({
	storefrontAccessToken: process.env.REACT_APP_STOREFRONT_API,
	domain: 'beansmag.myshopify.com/'
  });

const PRODUCTS_FOUND = "shopify/PRODUCTS_FOUND"
const PRODUCT_FOUND = "shopify/PRODUCT_FOUND"

const COLLECTION_FOUND = "shopify/COLLECTION_FOUND"
const TOPS_FOUND = "shopify/TOPS_FOUND"
const BOTTOMS_FOUND = "shopify/BOTTOMS_FOUND"
const MAGAZINES_FOUND = "shopify/MAGAZINES_FOUND"
const ACCESSORIES_FOUND = "shopify/ACCESSORIES_FOUND"

const CHECKOUT_FETCHED = "shopify/CHECKOUT_FETCHED"
const CHECKOUT_FOUND = "shopify/CHECKOUT_FOUND"
const SHOP_FOUND = "shopify/SHOP_FOUND"
const ADD_VARIANT_TO_CART = "shopify/ADD_VARIANT_TO_CART"
const UPDATE_QUANTITY_IN_CART = "shopify/UPDATE_QUANTITY_IN_CART"
const REMOVE_LINE_ITEM_IN_CART = "shopify/REMOVE_LINE_ITEM_IN_CART"
const OPEN_CART = "shopify/OPEN_CART"
const CLOSE_CART = "shopify/CLOSE_CART"
const CART_COUNT = "shopify/CART_COUNT"

const initialState = {
	isCartOpen: false,
	cartCount: 0,
	checkout: {},
	products: [],

	featured: [],
	tops: [],
	bottoms: [],
	magazines: [],
	accessories: [],

	product: {},
	shop: {},
	customer: {},
}

//reducers
export default (state = initialState, action) => {
	switch (action.type) {
		case PRODUCTS_FOUND:
			return { ...state, products: action.payload }
		case PRODUCT_FOUND:
			return { ...state, product: action.payload }

		case COLLECTION_FOUND:
			return { ...state, featured: action.payload }
		case TOPS_FOUND:
			return { ...state, tops: action.payload }
		case BOTTOMS_FOUND:
			return { ...state, bottoms: action.payload }
		case MAGAZINES_FOUND:
			return { ...state, magazines: action.payload }
		case ACCESSORIES_FOUND:
			return { ...state, accessories: action.payload }

		case CHECKOUT_FOUND:
			return { ...state, checkout: action.payload }
		case CHECKOUT_FETCHED:
			return { ...state, checkout: action.payload }
		case SHOP_FOUND:
			return { ...state, shop: action.payload }
		case ADD_VARIANT_TO_CART:
			return { ...state, checkout: action.payload }
		case UPDATE_QUANTITY_IN_CART:
			return { ...state, checkout: action.payload }
		case REMOVE_LINE_ITEM_IN_CART:
			return { ...state, checkout: action.payload }
		case OPEN_CART:
			return { ...state, isCartOpen: true }
		case CLOSE_CART:
			return { ...state, isCartOpen: false }
		case CART_COUNT:
			return { ...state, cartCount: action.payload }
		default:
			return state
	}
}

//action creators 
// Gets all the products from Shopify
function getProducts() {
	return (dispatch) => {
		client.product.fetchAll().then((resp) => {
			dispatch({
				type: PRODUCTS_FOUND,
				payload: resp,
			})
		})
	}
}

// Gets individual item based on id
function getProduct(id) {
	return async (dispatch) => {
		const resp = await client.product.fetch(id)
		dispatch({
			type: PRODUCT_FOUND,
			payload: resp,
		})
		return resp
	}
}

// Gets a  collection based on that collection's id
// gid://shopify/Collection/272383311919 base64encoded
function getCollection() {
	const collectionId = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI3MDMxODAxMDQxNQ=="
	return (dispatch) => {
		client.collection.fetchWithProducts(collectionId).then((resp) => {
			dispatch({
				type: COLLECTION_FOUND,
				payload: resp.products,
			})
			// console.log(resp.products)
		})
	}
}

// gid://shopify/Collection/276554186799
function getTOPS() {
	const collectionId = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI3NjU1NDE4Njc5OQ=="
	return (dispatch) => {
		client.collection.fetchWithProducts(collectionId).then((resp) => {
			dispatch({
				type: TOPS_FOUND,
				payload: resp.products,
			})
			// console.log(resp.products)
		})
	}
}
// gid://shopify/Collection/276253179951
function getBOTTOMS() {
	const collectionId = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI3NjI1MzE3OTk1MQ=="
	return (dispatch) => {
		client.collection.fetchWithProducts(collectionId).then((resp) => {
			dispatch({
				type: BOTTOMS_FOUND,
				payload: resp.products,
			})
			// console.log(resp.products)
		})
	}
}
// gid://shopify/Collection/276253114415
function getMAGAZINES() {
	const collectionId = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI3NjI1MzExNDQxNQ=="
	return (dispatch) => {
		client.collection.fetchWithProducts(collectionId).then((resp) => {
			dispatch({
				type: MAGAZINES_FOUND,
				payload: resp.products,
			})
			// console.log(resp.products)
		})
	}
}

// gid://shopify/Collection/276253212719
function getACCESSORIES() {
	const collectionId = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI3NjI1MzIxMjcxOQ=="
	return (dispatch) => {
		client.collection.fetchWithProducts(collectionId).then((resp) => {
			dispatch({
				type: ACCESSORIES_FOUND,
				payload: resp.products,
			})
			// console.log(resp.products)
		})
	}
}




function checkout() {
	return (dispatch) => {
		client.checkout.create().then((resp) => {
			dispatch({
				type: CHECKOUT_FOUND,
				payload: resp,
			})
			localStorage.setItem('state', resp.id)
			// localStorage.setItem('checkout', "null")
		})
	}
}

function fetchCheckout() {
	const checkout = localStorage.getItem('state')
	return (dispatch) => {
		client.checkout.fetch(checkout).then((checkout) => {
			dispatch({
				type: CHECKOUT_FETCHED,
				payload: checkout,
			})
			// localStorage.setItem('checkout', checkout.completedAt)
			// console.log(checkout.completedAt)
		})
	}
}

// Gets Shopify store information
function shopInfo() {
	return (dispatch) => {
		client.shop.fetchInfo().then((resp) => {
			dispatch({
				type: SHOP_FOUND,
				payload: resp,
			})
		})
	}
}

// Adds variants to cart/checkout
//LineItemsToAdd is a combination of qauntity and VariantId(which is size)
function addVariantToCart(checkoutId, lineItemsToAdd) {
	return async (dispatch) => {
		const response = await client.checkout.addLineItems(
			checkoutId,
			lineItemsToAdd
		)
		dispatch({
			type: ADD_VARIANT_TO_CART,
			payload: response,
		})
		return response
	}
}

// Updates quantity of line items in cart and in checkout state
function updateQuantityInCart(lineItemId, quantity, checkoutId) {
	const lineItemsToUpdate = [
		{ id: lineItemId, quantity: parseInt(quantity, 10) },
	]
	return async (dispatch) => {
		const resp = await client.checkout.updateLineItems(
			checkoutId,
			lineItemsToUpdate
		)
		dispatch({
			type: UPDATE_QUANTITY_IN_CART,
			payload: resp,
		})
		return resp
	}
}

// Removes line item from cart and checkout state
function removeLineItemInCart(checkoutId, lineItemId) {
	return (dispatch) => {
		client.checkout.removeLineItems(checkoutId, [lineItemId]).then((resp) => {
			dispatch({
				type: REMOVE_LINE_ITEM_IN_CART,
				payload: resp,
			})
		})
	}
}

// To close the cart
function handleCartClose() {
	return {
		type: CLOSE_CART,
	}
}

// To open the cart
function handleCartOpen() {
	return {
		type: OPEN_CART,
	}
}

// Set the count of items in the cart
function handleSetCount(count) {
	return {
		type: CART_COUNT,
		payload: count,
	}
}

export function useShopify() {
	const dispatch = useDispatch()
	const cartStatus = useSelector((appState) => appState.shopifyState.isCartOpen)
	const cartCount = useSelector((appState) => appState.shopifyState.cartCount)
	const products = useSelector((appState) => appState.shopifyState.products)
	const product = useSelector((appState) => appState.shopifyState.product)

	const featured = useSelector((appState) => appState.shopifyState.featured)
	const tops = useSelector((appState) => appState.shopifyState.tops)
	const bottoms = useSelector((appState) => appState.shopifyState.bottoms)
	const magazines = useSelector((appState) => appState.shopifyState.magazines)
	const accessories = useSelector((appState) => appState.shopifyState.accessories)


	const checkoutState = useSelector((appState) => appState.shopifyState.checkout)
	const shopDetails = useSelector((appState) => appState.shopifyState.shop)
	const fetchProducts = () => dispatch(getProducts())
	const fetchProduct = (id) => dispatch(getProduct(id))

	const fetchCollection = () => dispatch(getCollection())
	const fetchTops = () => dispatch(getTOPS())
	const fetchBottoms = () => dispatch(getBOTTOMS())
	const fetchMagazines = () => dispatch(getMAGAZINES())
	const fetchAccessories = () => dispatch(getACCESSORIES())

	const createCheckout = () => dispatch(checkout())
	const fetchedCheckout = (checkoutId) => dispatch(fetchCheckout(checkoutId))
	const createShop = () => dispatch(shopInfo())
	const closeCart = () => dispatch(handleCartClose())
	const openCart = () => dispatch(handleCartOpen())
	const setCount = (count) => dispatch(handleSetCount(count))

	const addVariant = (checkoutId, lineItemsToAdd) =>
		dispatch(addVariantToCart(checkoutId, lineItemsToAdd))
	const updateQuantity = (lineItemId, quantity, checkoutID) =>
		dispatch(updateQuantityInCart(lineItemId, quantity, checkoutID))
	const removeLineItem = (checkoutId, lineItemId) =>
		dispatch(removeLineItemInCart(checkoutId, lineItemId))

	return {
		products,
		product,

		featured,
		tops,
		bottoms,
		magazines,
		accessories,

		cartStatus,
		checkoutState,
		cartCount,
		shopDetails,
		addVariant,
		fetchProducts,
		fetchProduct,

		fetchCollection,
		fetchTops,
		fetchBottoms,
		fetchMagazines,
		fetchAccessories,

		createCheckout,
		createShop,
		closeCart,
		openCart,
		updateQuantity,
		removeLineItem,
		setCount,
		fetchedCheckout,
	}
}