import express from 'express';
import { createJob, getAllJobs, updateJob, showStats, deleteJob } from '../controllers/jobs.js';  

const router = express.Router();

router.route('/').post(createJob).get(getAllJobs);
router.route('/stats').get(showStats);
router.route('/:id').delete(deleteJob).patch(updateJob);

export default router;





