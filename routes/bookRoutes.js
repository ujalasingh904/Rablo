import { Router } from 'express';
import { addBook, deleteBook, getAllBooks, getBookById, updateBook, uploadCoverImage } from '../controllers/bookController.js';
import upload from '../middleware/uploadMiddleware.js';

const router = Router();

router.get('/', getAllBooks)
router.get('/:id', getBookById)
router.post('/', addBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);
router.post('/:id/upload-cover',upload.single("coverImage"),uploadCoverImage)

export default router;