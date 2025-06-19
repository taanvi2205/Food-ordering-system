import React, {createContext, useEffect, useState} from 'react'
export const FoodContext = createContext()
import { product  } from '../assets/assets'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const FoodContextProvider = ({children}) => {
    const delivery_fee = 120
    const currency = 'Rs'

    const [Products, setProducts] = useState(product)
    const [cartItems, setCartItems] = useState({})
    const navigate = useNavigate()

    const addToCart = async(itemId)=>{
        const updatedCart = {...cartItems};
        updatedCart[itemId] = (updatedCart[itemId] || 0) + 1
        setCartItems(updatedCart)

        

        toast.success(`Added to cart`)
    }

    const getCartCount =()=> {
        return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0)
    }

    const updateQuantity = async(itemId, quantity)=> {
        let cartData = {...cartItems}
        cartData[itemId] = quantity;
        setCartItems(cartData)
    }

    const getCartAmount = () =>{
        return Object.entries(cartItems).reduce((totalAmount, [itemId,quantity]) =>{
            const itemInfo = Products.find((product)=> product._id === itemId)
            return itemInfo ? totalAmount + itemInfo.price * quantity : totalAmount
        },0)
    }

  

    return(
        <FoodContext.Provider value={{Products,cartItems, navigate,currency, getCartAmount,addToCart, delivery_fee, getCartCount,updateQuantity}}>
            {children}
        </FoodContext.Provider>
    )
}


 export default FoodContextProvider