import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'
import AddReview from '../components/AddReview'
import { RestaurantsContext } from '../context/RestaurantsContext'

const RestaurantDetailPage = () => {
  const { id } = useParams()
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext)
  console.log(selectedRestaurant)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`)
        console.log(response)
        console.log(response.data.data)
        console.log(response.data.data.restaurant)

        setSelectedRestaurant(response.data.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])
  return (
    <div>
      <h1 className='text-center'></h1>

      <div>
        <AddReview />
      </div>
    </div>
  )
}

export default RestaurantDetailPage
