import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'

//@desc Auth logged user & get token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  res.send('auth user')
})

//@desc Regiser User
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  res.send('register user')
})

//@desc Logout User /clear cookie
//@route POST /api/users/logout
//@access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.send('logout user')
})


//@desc Get User profile
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send('get user profile')
})

//@desc Update User profile
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send('update user profile')
})


//@desc Get User
//@route GET /api/users
//@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send('get users')
})

//@desc Get User By ID
//@route GET /api/users/:id
//@access Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
  res.send('get user by id')
})

//@desc Delete User
//@route DELETE /api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send('delete user')
})

//@desc Update User
//@route PUT /api/users/:id
//@access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send('update user')
})

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserByID,
  updateUser,
  deleteUser
}