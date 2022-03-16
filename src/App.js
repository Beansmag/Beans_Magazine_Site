import React, { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { useShopify } from "./hooks";

import Products from './ComponentsShopify/Products' ;
// import LoadingPage from './Components/LoadingPage';
import Navbar from './Components/navigation/Navbar'


import About from './Components/About';
import LookbookPage from './Components/LookbookPage';

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
		  	{/* {!completed ?
				<LoadingPage />
				:
				<span></span>
			} */}
			<div className="App">
				<Navbar />
				<Switch>
					<Route exact path='/' component={Products} />
					<Route path='/lookbook' component={LookbookPage} />
					<Route path='/about' component={About} />
				</Switch>
			</div>
	</Router>
  );
}

export default App;
