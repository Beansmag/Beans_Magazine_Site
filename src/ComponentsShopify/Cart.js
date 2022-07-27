import React, { useEffect, useState } from "react";
import LineItem from "./LineItem";
import { useShopify } from "../hooks";
import { MdRemoveShoppingCart } from "react-icons/md";
import BlockContent from '@sanity/block-content-to-react';
import sanityClient from '../client';
import ReactGA from 'react-ga';;

export default (props) => {
	const {
		cartStatus,
		closeCart,
		openCart,
		checkoutState,
		setCount,
	} = useShopify()

	const [cartInfo, setCartInfo] = useState()

	function handleOpen(e) {
		e.preventDefault()
		openCart()
	}

	function handleClose(e) {
		e.preventDefault()
		closeCart()
	}

	function openCheckout(e) {
		e.preventDefault()
		// window.open(checkoutState.webUrl) // opens checkout in a new window
		window.location.replace(checkoutState.webUrl) // opens checkout in same window
		localStorage.setItem('checkout', checkoutState.completedAt)
	}

	useEffect(() => {
		sanityClient.fetch(`*[_type == "missionCartInfo"]{
			cartInfo
		}`)
		.then((data) => setCartInfo(data))
		.catch(console.error)
	  },[])

	useEffect(() => {
		const button = document.querySelector("button.App__view-cart")
		if (cartStatus === true) {
			button.classList.add("hide")
		} else {
			button.classList.remove("hide")
		}
		function getCount() {
			let lineItems =
				checkoutState.lineItems && checkoutState.lineItems.length > 0
					? checkoutState.lineItems
					: []
			let count = 0
			lineItems.forEach((item) => {
				count += item.quantity
				return count
			})
			setCount(count)
		}
		getCount()
	}, [cartStatus, checkoutState])

	function GAEvent() {
		ReactGA.event({
			category: 'User',
			action: 'Checkout Clicked',
			label: `$${checkoutState.totalPrice}`
		  });
	}

	return (
		<div style={{ position: "fixed", zIndex: "999999999999" }}>
			<div className="App__view-cart-wrapper2">
				<button 
					onClick={(e) => { cartStatus ? handleClose(e) : handleOpen(e) }} 
					className="App__view-cart"
				>
					Cart
				</button>
			</div>
			<div id="cart" >
				<div className={`Cart ${cartStatus ? "Cart--open" : ""}`} style={{ width: `${document.documentElement.clientWidth > 600 ? "350px" : " 90%"}` }}>
					<header className="Cart__header">
						<h4>CART</h4>
						<button className="Cart__close" onClick={(e) => handleClose(e)}>
							<MdRemoveShoppingCart />
						</button>
					</header>
					<h4 style={{ padding: '15px', fontWeight: '800' }}>
						<BlockContent 
							blocks={cartInfo && cartInfo[0].cartInfo} 
							projectId="m7j507qg"
							dataset="headless"
						/>
					</h4>
					<ul className="Cart__line-items">
						<LineItem />
					</ul>
					<footer className="Cart__footer">
						<div className="Cart-info clearfix">
							<div className="Cart-info__total Cart-info__small">Subtotal</div>
							<div className="Cart-info__pricing">
								<span className="pricing">$ {checkoutState.subtotalPrice}</span>
							</div>
						</div>
						<div className="Cart-info clearfix">
							<div className="Cart-info__total Cart-info__small">Taxes</div>
							<div className="Cart-info__pricing">
								<span className="pricing">$ {checkoutState.totalTax}</span>
							</div>
						</div>
						<div className="Cart-info clearfix">
							<div className="Cart-info__total Cart-info__small">Total</div>
							<div className="Cart-info__pricing">
								<span className="pricing">$ {checkoutState.totalPrice}</span>
							</div>
						</div>
						<button
							className="Cart__checkout button"
							onClick={(e) => { 
								openCheckout(e) 
								GAEvent()
							}}
						>
							Checkout
						</button>
					</footer>
				</div>
			</div>
		</div>
	)
}
