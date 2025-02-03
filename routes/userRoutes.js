import { Router } from 'express'
import upload from '../middleware/uploadMiddleware.js'
import { deleteUser, getUserById, getUsers, registerUser, updateUser, uploadProfilePicture } from '../controllers/userController.js'
import { protect } from '../middleware/authenticated.js'

const router = Router()

router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/', registerUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.post('/upload-profile-picture', protect, upload.single("profilePicture"), uploadProfilePicture)

export default router;