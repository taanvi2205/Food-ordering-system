import React, { useState } from 'react'
import Gpay from '../../assets/Gpay.png'
import CartTotal from '../../components/CartTotal/CartTotal'

import './Checkout.css'

const Checkout = () => {

  const [method , setMethod] = useState("cod")
  return (
    <div >
      <form className='form-container'>
        <div className='form-left'>
          <fieldset className='payment-method'>
            <legend>Payment Options</legend>
            <div className="payment-options">
              <div onClick={()=>setMethod("gpay")} className={`payment-option ${method === 'gpay' ? 'selected' : ""}  ` }>
                <img src={Gpay} alt="" className='payment-logo'/>
              </div>
              <div onClick={()=>setMethod("cod")} className={`payment-option ${method === 'cod' ? 'selected' : ""}  ` }>
                <span className='payment-text'>CASH ON DELIVERY</span>
              </div>
            </div>
          </fieldset>
          <div className='form-title'>
            <h2>Shipping Address</h2>
          </div>

          <div className="form-row">
            <input type="text" className='form-input' placeholder='First Name'/>
            <input type="text" className='form-input' placeholder='Last Name'/>
          </div>

          <input type="email" className='form-input' placeholder='Email Address'/>
          <input type="text" className='form-input' placeholder='Phone Number'/>
          <input type="text" className='form-input' placeholder='Street Address'/>

          <div className="form-row">
            <input type="text" className='form-input' placeholder='City'/>
            <input type="text" className='form-input' placeholder='State'/>
          </div>

          <div className="form-row">
            <input type="text" className='form-input' placeholder='Zipcode'/>
            <input type="text" className='form-input' placeholder='Country'/>
          </div>

        </div>

        <div className='form-right'>
          <CartTotal />
          <div className="form-submit">
            <button type="submit" className='submit-btn'>PLACE ORDER</button>
          </div>
        </div>

      </form>
      
    </div>
  )
}

export default Checkout