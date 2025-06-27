import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login'
import { ToastContainer } from 'react-toastify'

export const backendUrl = "http://localhost:4000"


const App = () => {

  const [token, setToken] = useState(localStorage.getItem(('token') || ""))
  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className='app-container'>
      <ToastContainer/>
      {/* <hr className="app-divider" /> */}
      {
        token === "" ? (
          <Login setToken={setToken} />
        ) : (
          <>
            <div className="app_content">
              <Sidebar setToken={setToken}/>
              <div className="page-content">
                <Routes>
                  <Route path='/add' element={<Add token={token}/> }/>
                  <Route path='/list' element={<List token={token} />} />
                  <Route path='/orders' element={<Orders token={token}/>} />
              </Routes>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default App