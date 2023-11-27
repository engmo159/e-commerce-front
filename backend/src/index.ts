import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'

import productsRoutes from './routes/products'
import categoriesRouters from './routes/categories'

const app = express()
const port = process.env.PORT || 3000

// Middlewares
app.use(express.json()) // Add this line to enable JSON parsing in the request body
app.use(cors())

// DB Connection (database name: e-commerce)
mongoose
  .connect(process.env.MONGODB_URL || '')
  .then(() => console.log('Connected to DB!'))
  .catch(err => console.log('Connection Error!', err))

// Routers
app.use('/products', productsRoutes)
app.use('/categories', categoriesRouters)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
