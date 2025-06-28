import React, { useState } from 'react'
import upload from '../../assets/upload.jpg'
import './Add.css'
import axios from 'axios';
import { backendUrl } from '../../App';
import { toast } from 'react-toastify';

console.log("Add page mounted");

const Add = ({token }) => {

  const [image, setimage] = useState(null)
  const [name, setname] = useState("")
  const [description, setdescription] = useState("")
  const [price, setprice] = useState("")
  const [category, setcategory] = useState("All")

  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      if(image) formData.append("image", image); 

      const response = await axios.post(`${backendUrl}api/product/add`, formData, {
        headers: {
         token 
        }
      });
      console.log(response)

      if(response.data.success){
        toast.success(response.data.message)
        setname("")
        setdescription("")
        setprice("")
        setimage(null)
      } else {
        toast.error(response.data.message)
      }
    }  catch (error) {
  console.error(error); // Log it
  toast.error(error.response?.data?.message || error.message || "Something went wrong");
}

  }

  return (
    <form
      onSubmit={ onSubmitHandler}
      className='form-container'
    >
      <div>
        <p className="form-label">Upload Image</p>
        <div className="image_upload_container">
            <label htmlFor="image">
                 <img src={!image ? upload : URL.createObjectURL(image)} className='upload-img'/>
                <input onChange={(e)=> setimage(e.target.files[0])} type="file" id="image" hidden />
            </label>
        </div>
      </div>
      <div className="form-group">
          <p className="form-label">Product Name</p>
          <input onChange={(e) => setname(e.target.value)} value={name} type="text" className="form-input" placeholder="Enter Product Name" required/>
      </div>
      <div className="form-group">
          <p className="form-label">Product Description</p>
          <textarea onChange={(e) => setdescription(e.target.value)} value={description} className="form-input" placeholder="Type Product Description" type="text" required/>
      </div>
      <div className="form-group-horizontal">
          <div>
            <p className="form-label">Product Category</p>
            <select onChange={(e) => setcategory(e.target.value)} value={category} className="form-select">
                <option value="All">All</option>
                <option value="Pizza">Pizza</option>
                <option value="Rice">Rice</option>
                <option value="Chicken">Chicken</option>
                <option value="Pasta">Pasta</option>
                <option value="Drinks">Drinks</option>
            </select>
          </div>
          <div>
              <p className="form-label">Product Price</p>
              <input onChange={(e)=> setprice(e.target.value)} value={price} type="number" placeholder="30" className="form-input price-input" />
          </div>
          <button type="submit" className='submit-btn'>ADD PRODUCT</button>
      </div>
    </form>
  )
}

export default Add 