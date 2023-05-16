import User from '../../models/userModel.js'
import asyncHandler from 'express-async-handler'
import { generateToken } from '../../helpers/generateToken.js'

// @desc    Register user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
	const { email, password, name } = req.body

	const isHaveUser = await User.findOne({ email })

	if (isHaveUser) {
		res.status(400)
		throw new Error('Данный пользователь уже зарегистрирован')
	}

	const user = await User.create({
		email,
		password,
		name,
	})

	const token = generateToken(user._id)
	console.log(user._id, token)

	res.json({ user, token })
})
