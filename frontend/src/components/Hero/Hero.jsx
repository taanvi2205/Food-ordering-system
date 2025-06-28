import React from 'react'
import hero_img from '../../assets/chicken_saladBackgroundRemoved.png'
import { FaShippingFast } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import { BiSupport } from 'react-icons/bi'
import { MdPayment } from 'react-icons/md'
import './Hero.css'

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero_top">
        <div className="hero_left">
          <h2>Enjoy your delicious meal</h2>
          <h1>Discover delicious meal that nourishes you</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias ipsam possimus adipisci veritatis tenetur, amet fugit, fuga maiores voluptatum saepe et pariatur eligendi. Ducimus nemo fuga voluptas doloribus aliquam minima!</p>
          <button>Explore our menu</button>
        </div>
        <div className="hero_right">
          <img src={hero_img} alt="" className='hero-img'/>
        </div>
      </div>
      <div className="hero_bottom">
        <div className="hero_content">
          <div className="info_icon"><FaShippingFast className='hero_icon' /></div>
          <div className='detail'>
            <h3>Free Shipping</h3>
            <p>Free shipping on order</p>
          </div>
        </div>
        <div className="hero_content">
           <div className="info_icon"><FiSend className='hero_icon' /></div>
          <div className='detail'>
            <h3>worldwide Deliver</h3>
            <p>We deliver to all countries</p>
          </div>
        </div>

        <div className="hero_content">
           <div className="info_icon"><BiSupport className='hero_icon' /></div>
          <div className='detail'>
            <h3>24/7 Support</h3>
            <p>Full support on process</p>
          </div>
        </div>

        <div className="hero_content">
           <div className="info_icon"><MdPayment className='hero_icon' /></div>
          <div className='detail'>
            <h3>Secure Payment</h3>
            <p>Your payment is secure</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Hero