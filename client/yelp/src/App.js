import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './routes/Home'
import UpdatePage from './routes/UpdatePage'
import RestaurantDetailPage from './routes/RestaurantDetailPage'
import { RestaurantsContextProvider } from './context/RestaurantsContext'

function App() {
  return (
    <RestaurantsContextProvider>
      <div className='container'>
        <Router>
          <Routes>
            <Route path='/' exact element={<Home />} />

            <Route path='/restaurants/:id' element={<RestaurantDetailPage />} />
            <Route path='/restaurants/:id/update' element={<UpdatePage />} />
          </Routes>
        </Router>
      </div>
    </RestaurantsContextProvider>
  )
}

export default App
