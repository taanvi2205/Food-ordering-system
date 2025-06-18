import React, {createContext, useState} from 'react'
export const FoodContext = createContext()
import { product  } from '../assets/assets'

const FoodContextProvider = ({children}) => {

    const [Products, setProducts] = useState(product)

    return(
        <FoodContext.Provider value={{Products}}>
            {children}
        </FoodContext.Provider>
    )
}


 export default FoodContextProvider