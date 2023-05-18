import Post from '../../models/postModel.js'

export const updatePost = async (req, res) => {
	try {
		const postId = req.body
		const userId = req.user._id
		const { message, media } = req.body

		const updatedPost = await Post.findOneAndUpdate(
			{
				_id: postId,
				user: userId,
			},
			{ message, media },
			{ new: true }
		)
		if (!updatedPost) {
			return res.status(404).json({ error: 'Post not found' })
		}

		res.json(updatedPost)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
