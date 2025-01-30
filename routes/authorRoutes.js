import {Router} from 'express';
import { createAuthor, deleteAuthor, getAllAuthors, getAuthorById, updateAuthor } from '../controllers/authorsController.js';


const router = Router();

router.get('/', getAllAuthors)
router.get('/:id', getAuthorById)
router.post('/', createAuthor)
router.put('/:id', updateAuthor)
router.delete('/:id', deleteAuthor)

export default router;