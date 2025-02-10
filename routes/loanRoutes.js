import { Router } from 'express'; 
import { createLoan, getLoans, updateLoan } from '../controllers/loanController';

const router = Router();

router.get('/',getLoans)
router.post('/',createLoan)
router.put('/:id',updateLoan)
router.delete('/:id',deleteLoan)

export default router;