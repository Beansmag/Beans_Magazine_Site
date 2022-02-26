import React, { useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { useShopify } from "./hooks";

import Cart from './ComponentsShopify/Cart';
// import Home from './Components/Home';
import Products from './ComponentsShopify/Products' ;


import About from './Components/About';
import Contact from './Components/About';
import Lookbook from './Components/Lookbook';
import Terms from './Components/Terms';
import Return from './Components/Return';

import './App.css';

function App(props) {

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
			<div className="App">
				{/* <Cart /> */}
				<Switch>
					<Route exact path='/' component={Products} />
					<Route path='/lookbook' component={Lookbook} />
					<Route path='/return' component={Return} />
					<Route path='/contact' component={Contact} />
					<Route path='/about' component={About} />
					<Route path='/terms' component={Terms} />
				</Switch>
			</div>
	</Router>
  );
}

export default App;
