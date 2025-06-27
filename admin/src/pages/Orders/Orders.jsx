import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../../App';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {

    if (!token) return null;

    try {
      const response = await axios.post(backendUrl + "/api/order/list",
        {},
        {headers : {token}}
      )
      console.log(response)

      
    } catch (error) {
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h2>Orders</h2>
    </div>
  )
}

export default Orders;
