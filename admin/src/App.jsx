import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <div className='app-container'>
      <hr className="app-divider" />
      <div className="app_content">
        <Sidebar/>
        <div className="page-content">
          <Routes>
            <Route path='/add' element={<Add />} />
            <Route path='/list' element={<List />} />
            <Route path='/orders' element={<Orders />} />
        </Routes>
        </div>
      </div>
    </div>
  )
}

export default App