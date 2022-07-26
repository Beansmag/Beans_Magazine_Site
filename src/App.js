import React, { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { useShopify } from "./hooks";
import sanityClient from './client';

import Products from './ComponentsShopify/Products' ;
import LoadingPage from './Components/LoadingPage';
import Navbar from './Components/navigation/Navbar'

import About from './Components/About';
import LookbookPage from './Components/LookbookPage';

import './App.css';

function App(props) {
	const [completed, setCompleted] = useState(false)
	const [videoData ,setVideoData] = useState()

    useEffect(() => {
        sanityClient.fetch(`*[_type == "loadingAnimation"]{
			loadingTime,
        }`)
        .then((data) => setVideoData(data))
        .catch(console.error)
      },[])

	useEffect(() => {
		setTimeout(() => {
			setCompleted(true)
		  }, `${videoData === undefined ? 3 : videoData[0].loadingTime}000`);
	  }, [videoData]);

	const {
		createShop,
		createCheckout,
		fetchProducts,
		fetchCollection,
	} = useShopify()

	useEffect(() => {
		createShop()
		fetchProducts()
		createCheckout()
		fetchCollection()
	},[])

  return (
	<div className="App">
	  <Router>
		  	{!completed ?
				<LoadingPage />
				:
				<span></span>
			}
			<div>
				<Navbar />
				<Switch>
					<Route exact path='/' component={Products} />
					<Route path='/lookbook' component={LookbookPage} />
					<Route path='/about' component={About} />
				</Switch>
			</div>
		</Router>
	</div>
  );
}

export default App;
