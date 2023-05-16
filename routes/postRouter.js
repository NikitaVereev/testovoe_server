import express from 'express'
import { createPost } from '../controllers/post/createPostController.js'
import { getPosts } from '../controllers/post/postController.js'
import { updatePost } from '../controllers/post/updatePostController.js'
import { deletePost } from '../controllers/post/deletePostController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router
	.route('/posts')
	.post(protect, createPost)
	.put(protect, updatePost)
	.delete(protect, deletePost)
router.route('/posts').get(getPosts)

export default router
