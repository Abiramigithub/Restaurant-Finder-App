import React, { useContext, useState } from 'react'
import { RestaurantsContext } from '../context/RestaurantsContext'
import RestaurantFinder from '../apis/RestaurantFinder'

const AddReview = () => {
  const { addReview, setAddReview } = useContext(RestaurantsContext)
  const [name, setName] = useState()
  const [rating, setRating] = useState()
  const [reviewText, setReviewText] = useState()
  const [restaurantName, setRestaurantName] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await RestaurantFinder.post('/reviews', {
        name: name,
        restaurantname: restaurantName,
        rating: rating,
        review: reviewText,
      })
      console.log(response)
      console.log(response.data)
      console.log(response.data.data)
      console.log(response.data.data.reviews)
      setAddReview(response.data.data.reviews)
      alert('review send successfully')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      <form action=''>
        <div className='form-row'>
          <div className='form-group col-4'>
            <label htmlFor='name'>RestaurantName</label>
            <input
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              id='retstaurantname'
              placeholder='restaurantname'
              type='text'
              className='form-control'
            />
          </div>
          <div className='form-group col-4'>
            <label htmlFor='name'>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id='name'
              placeholder='name'
              type='text'
              className='form-control'
            />
          </div>
          <div className='form-group col-4'>
            <label htmlFor='rating'>Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              id='rating'
              className='custom-select'
            >
              <option disabled>Rating</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='Review'>Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            id='Review'
            className='form-control'
          ></textarea>
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

export default AddReview
