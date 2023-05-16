import Post from '../../models/postModel.js'

export const deletePost = async (req, res) => {
	try {
		const postId = req.body
		const userId = req.user._id

		const deletePost = await Post.findOneAndDelete({
			_id: postId,
			user: userId,
		})

		if (!deletePost) {
			return res.status(404).json({ error: 'Поста нет' })
		}

		res.json({ message: 'Пост удалён' })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
