import React, { useState, useEffect } from "react"
import { useShopify } from "../hooks"

export default (props) => {
	const { products, fetchProduct } = useShopify()
	const [translate, setTranslate] = useState(0)
	const [index, setIndex] = useState(9)



	// console.log(products[1].title && products[1].title)

	// function getRandomInt(max) {
	// 	return Math.floor(Math.random() * max);
	//   }

	// products.length / 2

	function handleClick(e, product_id) {
		e.preventDefault()
		const id = product_id
		fetchProduct(id).then((res) => {
			props.history.push(`/${res.id}`)
		})
	}

	return (
		<div>
			<div style={{ position: "fixed", zIndex: "9" }}>
				<button 
					onClick={e => {
						setTranslate(translate + 5)
						setIndex(index - 1)
				}}>
					Left
				</button>
				<button 
					onClick={e => {
						setTranslate(translate - 5)
						setIndex(index + 1)
				}}>
					Right
				</button>
			</div>
			<div style={{ position: "fixed", zIndex: "9", marginTop: "20px" }}>
				{/* <h1>{products && products[index && index].title}</h1> */}
			</div>
			<div className="Product-wrapper" style={{width: "500vw", transform: `translateX(${-38 + translate}%)` }} >
					{products &&
					products.map((product, i) => {
						const image = product.images[0]
						return (
							<div className='home-prod-row' key={i} style={{ width: `${100 / products.length}`}}>
									{image ? (
										<img src={image.src} alt={`${product.title} product shot`} className="home-prod-img"
											onClick={(e) => handleClick(e, product.id)}
											// style={{ marginTop: `${getRandomInt(6)}0px` }}
										/>
									) : null}
									<p className="Product__price">${product.variants[0].price}</p>
									<button
										// className="Product__buy button"
										onClick={(e) => handleClick(e, product.id)}
									>
										View Details
									</button>
							</div>
						)
					})
					}
			</div>
			<div>
			{/* {products &&
					products.map((hat, i) => {
						return (
							<div key={i}>
								{index === i ?
									<h1>{hat.title}</h1>
									:
									<span>not matching</span>
								}
							</div>
						)
					})
			} */}
			</div>
		</div>
	)
}













			{/* {products &&
				products.map((product, i) => {
					const image = product.images[0]
					return (
						<div className="Product" key={product.id + i}>
							{image ? (
								<img src={image.src} alt={`${product.title} product shot`} />
							) : null}
							<div>
								<h4 className="Product__title">{product.title}</h4>
								<p className="Product__price">${product.variants[0].price}</p>
							</div>
							<button
								className="Product__buy button"
								onClick={(e) => handleClick(e, product.id)}
							>
								View Details
							</button>
						</div>
					)
				})} */}