import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'

const RestaurantList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext)
  console.log(restaurants)
  let history = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get('/')
        console.log(response)
        console.log(response.data.results)
        setRestaurants(response.data.results)
      } catch (err) {}
    }
    fetchData()
  }, [setRestaurants])

  const handleDelete = async (e, id) => {
    e.stopPropagation()
    try {
      const response = restaurants.filter((restaurant) => {
        return restaurant.id !== id
      })
      console.log(response)
      setRestaurants(response)
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdate = async (e, id) => {
    history(`/restaurants/${id}/update`)
  }

  const handleRestaurantSelect = (id) => {
    history(`/restaurants/${id}`)
  }
  return (
    <div className='list-group'>
      <table className='table table-hover table-dark'>
        <thead>
          <tr className='bg-primary'>
            <th>Restaurant</th>
            <th>Location</th>
            <th>Price Range</th>
            {/* <th>Ratings</th> */}
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <tr
                  onClick={() => handleRestaurantSelect(restaurant.id)}
                  key={restaurant.id}
                >
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{'$'.repeat(restaurant.price_range)}</td>
                  {/* <td>review</td> */}
                  <td>
                    {' '}
                    <button
                      onClick={(e) => handleUpdate(e, restaurant.id)}
                      className='btn btn-warning'
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e, restaurant.id)}
                      className='btn btn-danger'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          {/* <tr>
                <td>mcdonalds</td>
                <td>New York</td>
                <td>$$</td>
                <td>Rating</td>
                <td>
                  <button className='btn btn-warning'>Update</button>
                </td>
                <td>
                  <button className='btn btn-danger'>Delete</button>
                </td>
              </tr>
              <tr>
                <td>mcdonalds</td>
                <td>New York</td>
                <td>$$</td>
                <td>Rating</td>
                <td>
                  <button className='btn btn-warning'>Update</button>
                </td>
                <td>
                  <button className='btn btn-danger'>Delete</button>
                </td>
              </tr> */}
        </tbody>
      </table>
    </div>
  )
}

export default RestaurantList
