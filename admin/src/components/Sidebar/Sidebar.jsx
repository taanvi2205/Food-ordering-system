import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoMdAddCircleOutline} from 'react-icons/io'
import {IoLogOut} from 'react-icons/io5'
import {MdFormatListBulleted, MdAddShoppingCart} from 'react-icons/md'
import './sidebar.css'

const Sidebar = ({ setToken }) => {
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setToken(""); // This triggers App to show <Login />
//   };
  return (
    <div className='sidebar-container'>
        <div className="sidebar-header">
            <h2>FoodSpot</h2>
        </div>
        <div className="sidebar-links">
            <NavLink className='sidebar-link' to='/add'>
                <IoMdAddCircleOutline className='sidebar-icon' />
                <p className="sidebar-text">Add Product</p>
            </NavLink>
            <NavLink className='sidebar-link' to= '/list'>
                <MdFormatListBulleted className='sidebar-icon' />
                <p className="sidebar-text">List Product</p>
            </NavLink>
            <NavLink className='sidebar-link' to= '/orders'>
                <MdAddShoppingCart className='sidebar-icon' />
                <p className="sidebar-text">Orders</p>
            </NavLink  > 
            <button className="sidebar-link loginBtn" onClick={() => setToken("")} >
                <IoLogOut className='sidebar-icon' />
                <p className="sidebar-text">Logout</p>
            </button>
        </div>
    </div>
  )
}

export default Sidebar