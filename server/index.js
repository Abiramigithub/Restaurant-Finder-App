const express = require('express')
const cors = require('cors')

const pool = require('./db/db.js')

const app = new express()
app.use(cors())
app.use(express.json())

// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
//   res.setHeader('Access-Control-Allow-Credentials', true)
//   next()
// })
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   )
//   if ('OPTIONS' == req.method) {
//     res.sendStatus(200)
//   } else {
//     next()
//   }
// })
app.use(express.json())

//Get all restaurants
app.get('/api/v1/restaurants', async (req, res) => {
  try {
    const results = await pool.query('select * from restaurants')
    // console.log(results)
    res.status(200).json({
      status: 'success',
      results: results.rows,
      data: {
        restaurants: results.rows,
      },
    })
  } catch (err) {
    console.log(err)
  }
})

//Get a restaurant
app.get('/api/v1/restaurants/:id', async (req, res) => {
  console.log(req.params)

  try {
    const { id } = req.params
    const restaurant = await pool.query(
      'SELECT * FROM restaurants WHERE id = $1',
      [id]
    )
    // const reviews = await pool.query(
    //   'SELECT * FROM restaurants WHERE id = $1',
    //   [id]
    // )
    // console.log(results)
    res.status(200).json({
      status: 'success',
      data: {
        restaurant: restaurant.rows[0],
        // reviews: reviews.rows,
      },
    })
  } catch (err) {
    console.log(err)
  }
})

//Create a Restaurant
app.post('/api/v1/restaurants', async (req, res) => {
  console.log(req.body)
  try {
    const results = await pool.query(
      'INSERT INTO restaurants(name,location,price_range) VALUES($1,$2,$3) RETURNING *',
      [req.body.name, req.body.location, req.body.price_range]
    )
    console.log(results)
    res.status(201).json({
      status: 'success',
      message: 'data created successfully',
      data: {
        restaurant: results.rows[0],
      },
    })
  } catch (err) {
    console.log(err)
  }
})

app.post('/api/v1/restaurants/reviews', async (req, res) => {
  console.log(req.body)
  try {
    const results = await pool.query(
      'INSERT INTO reviews(name,restaurantname,review,rating) VALUES($1,$2,$3,$4) RETURNING *',
      [req.body.name, req.body.restaurantname, req.body.review, req.body.rating]
    )
    // console.log(results)
    res.status(201).json({
      status: 'success',
      message: 'review send successfully',
      data: {
        reviews: results.rows,
      },
    })
  } catch (err) {
    console.log(err)
  }
})

// Update Restaurants
app.put('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const results = await pool.query(
      'UPDATE restaurants SET name = $1,location = $2,price_range = $3 WHERE id = $4 RETURNING *',
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    )
    console.log(results)

    res.status(201).json({
      status: 'success',
      message: 'data updated successfully',
      data: {
        restaurant: results.rows[0],
      },
    })
  } catch (err) {
    console.error(err.message)
  }
  console.log(req.params.id)
  console.log(req.body)
})
//Delete a restaurant
app.delete('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const results = await pool.query('DELETE FROM restaurants WHERE id = $1', [
      req.params.id,
    ])
    res.status(204).json({
      status: 'success',
      message: 'data deleted successfully',
    })
  } catch (err) {
    console.error(err.message)
  }
})

const PORT = 5002
app.listen(PORT, () => {
  console.log(
    'The server is up and listening on port 5002.. and nodemon is working good..'
  )
})
