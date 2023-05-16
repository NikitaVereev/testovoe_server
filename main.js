import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'

import path from 'path'

/* Config */
import { connectDB } from './config/db.js'

/* Middleware */
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

/* Routes */
import userRouter from './routes/userRouter.js'
import postRouter from './routes/postRouter.js'

dotenv.config()

connectDB()

const app = express()
app.use(
	cors({
		credentials: true,
		origin: 'http://localhost:5173',
		// 'https://volunteer-iota.vercel.app',
	})
)

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

app.use(express.json())

const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads/')))

app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)

if (process.env.NODE_ENV === 'production') {
	// Step 1:
	app.use(express.static(path.resolve(__dirname, './client/build')))
	// Step 2:
	app.get('*', function (request, response) {
		response.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
	})
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
