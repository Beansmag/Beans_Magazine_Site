import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <Link to='/lookbook'>Lookbook</Link>
            {/* <Link to='/contact'>Contact</Link>
            <Link to='/terms'>Terms</Link> */}
            <Link to='/about'>About</Link>
            {/* terms, return policy, contact all on the same page */}
        </div>
    )
}

export default Home