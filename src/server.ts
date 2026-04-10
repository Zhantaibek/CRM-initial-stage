import express from "express";
import userRoutes from '@modules/users/user.routes'
import productRoutes from '@modules/products/product.routes'
import orderRoutes from '@modules/orders/order.routes'
import authRoutes from '@modules/auth/auth.routes'

const PORT = 5000

const app = express()
app.use(express.json())

app.use('/users', userRoutes)
app.use('/product', productRoutes)
app.use('/order', orderRoutes)
app.use('/auth', authRoutes)
app.listen(PORT , () => {
  console.log(`🚀 Server running on port ${PORT}`)
}) 

