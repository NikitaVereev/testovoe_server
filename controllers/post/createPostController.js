import Post from '../../models/postModel.js'

export const createPost = async (req, res) => {
	try {
		const { message } = req.body
		const user = req.user
		const newPost = new Post({
			message,
			user: user._id,
		})
		const savedPost = await newPost.save()
		res.status(201).json(savedPost)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
