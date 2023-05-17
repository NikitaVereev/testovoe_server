import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import multer from 'multer'
import fs from 'fs'
import { protect } from './middleware/authMiddleware.js'

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
		origin: 'https://testovoe-client.vercel.app/',
	})
)

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		if (!fs.existsSync('uploads')) {
			fs.mkdirSync('uploads')
		}
		cb(null, 'uploads')
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname)
	},
})

const upload = multer({ storage })

app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)

app.post('/api/uploads', protect, upload.single('file'), (req, res) => {
	if (req.file) {
		res.json({
			url: `/uploads/${req.file.originalname}`,
		})
	} else {
		res.status(400).json({
			error: 'Нет файла для загрузки',
		})
	}
})

app.use('/api/uploads', express.static('uploads'))

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 4200

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
