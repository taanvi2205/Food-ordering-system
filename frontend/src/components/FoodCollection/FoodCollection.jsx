import React, { useContext, useState } from 'react'
import { categoryItem, product } from '../../assets/assets'
import { FoodContext } from '../../context/FoodContext'
import './FoodCollection.css'

const FoodCollection = () => {

  const {Products} = useContext(FoodContext)

  const [Category, setCategory] = useState("All")
  return (
    <div>
      <div className='food_container'>
        <div className='header_section'>
          <h1>Discover our menu</h1>
          <hr className='divider'/>
        </div>
        <div className="display_container">
          <div className='category_section'>
             <h1>Explore Our categories</h1>
             <ul className="category_list">
              {
                categoryItem.map((item, index) =>(
                  <li key={index}
                  onClick={()=>setCategory((prev) =>(prev === item.category_title ? "All" : item.category_title))}
                  className={Category === item.category_title ? "active" : ""}
                  > 
                    {item.category_title}
                  </li>
                ))
              }
             </ul>
          </div>
          <div className='grid_display'>
            {
              Products.length > 0 ? (
                Products.filter((product) => Category === "All" || Category === product.category).map((product) =>(
                  <div key={product._id} className='product_card' >
                    <div className='product-image'>
                      <img src={product.image} alt="" />
                    </div>
                    <h3>{product.name}</h3>
                    <div className='price-add'>
                      <p> Rs.{product.price}</p>
                      <button>Add to cart</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No products is available</p>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodCollection