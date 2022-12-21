import React, { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'
export const UpdateRestaurant = () => {
  const { id } = useParams()
  let history = useNavigate()

  const { restaurants } = useContext(RestaurantsContext)
  console.log(restaurants)
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [priceRange, setPriceRange] = useState('')

  //   console.log(test)

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`)
      console.log(response.data.data)
      setName(response.data.data.restaurant.name)
      setLocation(response.data.data.restaurant.location)
      setPriceRange(response.data.data.restaurant.price_range)
    }
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange,
    })

    console.log(updatedRestaurant)
    // console.log(updatedRestaurant)

    history('/')
  }
  return (
    <div>
      {/* <h1>{restaurants.name}</h1> */}

      <form action=''>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='form-control'
            type='text'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='location'>Location</label>
          <input
            id='location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className='form-control'
            type='text'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='price_range'>Price Range</label>
          <input
            id='price_range'
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className='form-control'
            type='number'
          />
        </div>
        <button
          type='submit'
          onClick={handleSubmit}
          className='btn btn-primary'
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default UpdateRestaurant

// import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import RestaurantFinder from '../apis/RestaurantFinder'
// import { RestaurantsContext } from '../context/RestaurantsContext'

// export const UpdateRestaurant = (props) => {
//   const { id } = useParams()
//   const { restaurants } = useContext(RestaurantsContext)
//   const [name, setName] = useState()
//   const [location, setLocation] = useState()
//   const [priceRange, setPriceRange] = useState()

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = RestaurantFinder.get(`/${id}`)
//       console.log(response)
//       console.log(response.data.data)
//     }
//     fetchData()
//   }, [])

//   return (
//     <div>
//       <h1>{restaurants[0].name}</h1>
//       <form action=''>
//         <div className='form-group'>
//           <label htmlFor='name'>Name</label>
//           <input
//             id='name'
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className='form-control'
//             type='text'
//           />
//         </div>

//         <div className='form-group'>
//           <label htmlFor='location'>Location</label>
//           <input
//             id='name'
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             className='form-control'
//             type='text'
//           />
//         </div>

//         <div className='form-group'>
//           <label htmlFor='price_range'>Price Range</label>
//           <input
//             id='name'
//             value={priceRange}
//             onChange={(e) => setPriceRange(e.target.value)}
//             className='form-control'
//             type='number'
//           />
//         </div>

//         <button className='btn btn-primary'>Submit</button>
//       </form>
//     </div>
//   )
// }
