import React, {createContext, useEffect, useState} from 'react'
export const FoodContext = createContext()
import { product  } from '../assets/assets'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import {backendUrl} from "../App"


const FoodContextProvider = ({children}) => {
    const delivery_fee = 120
    const currency = 'Rs'

    const [Products, setProducts] = useState(product)
    const [cartItems, setCartItems] = useState({})
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    const addToCart = async(itemId)=>{
        
        const updatedCart = {...cartItems};
        updatedCart[itemId] = (updatedCart[itemId] || 0) + 1
        setCartItems(updatedCart)
        console.log(`${itemId} added to cart`)

        toast.success(`Added to cart`)

        if(token){
            try {
                await axios.post(`${backendUrl}/api/cart/add`, {itemId}, {headers: {token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getCartCount = () => {
        return Object.entries(cartItems || {})
            .filter(([itemId, qty]) => itemId !== 'undefined' && qty > 0)
            .reduce((total, [_, qty]) => total + qty, 0);
    };

    const updateQuantity = async (itemId, quantity) => {
        if (!itemId || typeof quantity !== 'number') {
            console.warn('Invalid itemId or quantity');
            return;
        }

        let cartData = { ...cartItems };
        cartData[itemId] = quantity;
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/update`, { itemId, quantity }, {
                    headers: { token }
                });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };


    const getCartAmount = () =>{
        return Object.entries(cartItems).reduce((totalAmount, [itemId,quantity]) =>{
            const itemInfo = Products.find((product)=> product._id === itemId)
            return itemInfo ? totalAmount + itemInfo.price * quantity : totalAmount
        },0)
    }

    

    const getProductsData = async()=>{
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`)
            console.log(response.data)
        if(response.data.success){
            setProducts(response.data.products)
            } else {
            toast.error(response.data.message)
            }
        }catch (error) {
            console.log(error);
            toast.error(error.message)
            }
    }
    const getUserCart = async(token)=>{
        try {
            const response = await axios.post(`${backendUrl}/api/cart/get`, {}, {headers: {token}})

            if(response.data.success){
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
            
    useEffect(()=> {
        getProductsData()
    },[])

        // ✅ Step 1: Set token from localStorage
    useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
        setToken(savedToken);
    }
    }, []);

    // ✅ Step 2: When token is available, get user cart
    useEffect(() => {
    if (token) {
        getUserCart(token);
    }
    }, [token]);


    return(
        <FoodContext.Provider value={{Products, getUserCart,  cartItems, navigate,currency, getCartAmount,addToCart, delivery_fee, getCartCount,updateQuantity, token, setToken}}>
            {children}
        </FoodContext.Provider>
    )
}


 export default FoodContextProvider