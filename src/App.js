import React, { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { useShopify } from "./hooks";

import Cart from './ComponentsShopify/Cart';
// import Home from './Components/Home';
import Products from './ComponentsShopify/Products' ;
// import ProductView from './ComponentsShopify/ProductView';
import LoadingPage from './Components/LoadingPage';
import Navbar from './Components/Navbar'


import About from './Components/About';
import Lookbook from './Components/Lookbook';

import './App.css';

function App(props) {
	const [completed, setCompleted] = useState(false)

	useEffect(() => {
		setTimeout(() => {
			setCompleted(true)
		  }, 3000);
	  }, []);

	const {
		createShop,
		createCheckout,
		fetchProducts,
	} = useShopify()

	useEffect(() => {
		createShop()
		fetchProducts()
		createCheckout()
	},[])

  return (
	  <Router>
		  	{!completed ?
				<LoadingPage />
				:
				<span></span>
			}
			<div className="App">
				<Cart />
				<Navbar />
				<Switch>
					<Route exact path='/' component={LoadingPage} />
					<Route path='/home' component={Products} />
					<Route path='/lookbook' component={Lookbook} />
					<Route path='/about' component={About} />
				</Switch>
			</div>
	</Router>
  );
}

export default App;
