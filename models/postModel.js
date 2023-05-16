import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema

const postLogSchema = mongoose.Schema(
	{
		user: {
			type: ObjectId,
			ref: 'User',
			required: true,
		},
		message: { type: String, required: true },
	},
	{
		minimize: false,
		timestamps: true,
	}
)

const Post = mongoose.model('Post', postLogSchema)

export default Post
