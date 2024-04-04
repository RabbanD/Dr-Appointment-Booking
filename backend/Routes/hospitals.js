import express from 'express'
import { deleteHospital, getAllHospital, getHospitalProfile, getSingleHospital, updateHospital } from '../Controllers/hospitalController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';

import reviewRouter from './review.js'

const router = express.Router()

//nested route
router.use('/:hospitalId/reviews', reviewRouter);

router.get('/:id', getSingleHospital)
router.get('/', getAllHospital)
router.put('/:id', authenticate, restrict(["hospital"]), updateHospital)
router.delete('/:id', authenticate, restrict(["hospital"]), deleteHospital)
router.get('/profile/me', authenticate, restrict(['hospital']), getHospitalProfile);

export default router;