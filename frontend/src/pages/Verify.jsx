import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import {useSearchParams} from 'react-router-dom'

const Verify = () => {

    const { navigate, token, setCartItems } = useContext(FoodContext)

    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        try {
            if(!token){
                return null
            }

            const response = await axios.post(backendUrl + '/api/order/verifyStripe', {success, orderId}, {headers: {token}})

            if (response.data.success) {
                setCartItems({})
                navigate('/orders')
                toast.success('Order Placed Successfully')
            } else {
                navigate('/cart')
                toast.error('Order Failed')
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [token])
    return (
        <div>Verify</div>
    )
}

export default Verify