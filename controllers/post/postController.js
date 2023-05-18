import Post from '../../models/postModel.js'
import asyncHandler from 'express-async-handler'

export const getPosts = asyncHandler(async (req, res) => {
	const page = parseInt(req.query.page) || 1
	const pageSize = parseInt(req.query.pageSize) || 20

	const skip = (page - 1) * pageSize

	const totalPosts = await Post.countDocuments()

	const posts = await Post.find()
		.populate('user')
		.sort({ createdAt: -1 })
		.skip(skip)
		.limit(pageSize)

	res.status(200).json({
		page,
		pageSize,
		totalPosts,
		totalPages: Math.ceil(totalPosts / pageSize),
		posts,
	})
})
