import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'
import { BiCart, BiUser } from 'react-icons/bi';
 
const Navbar = () => {
  return (
    <div>
        <div className='navbar'>
            <div>
                <Link to='/' >
                <h2>Yumsta</h2>
                </Link>
            </div>
            <div className='search-bar'>
                <input type="text" placeholder='Search a dish' className='search-input'/>
                <button className='search-btn'>SEARCH</button>
            </div>

            <div className='icons'>
                <div className='profile-group'>
                    <BiUser className='icon'/>
                    <div className='dropdown-menu'>
                        <Link to='/login' ><p className='dropdown-item'>Login/Sign Up </p></Link>
                        <Link to='/orders' ><p className='dropdown-item'>Orders</p></Link>
                        <p className='dropdown-item'>Logout</p>
                    </div>
                </div>
                <button className='cart-icon'>
                    <BiCart className='icon'/>
                    <span className='cart-qty'>0</span>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Navbar