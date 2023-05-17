import Post from '../../models/postModel.js'

export const createPost = async (req, res) => {
	try {
		const user = req.user

		const newPost = new Post({
			message: req.body.message,
			media: req.body.media,
			user: user._id,
		})
		const savedPost = await newPost.save()
		res.status(201).json(savedPost)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
