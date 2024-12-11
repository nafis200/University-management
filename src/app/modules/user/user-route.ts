

import express from 'express';
import { UserController } from './user-controller';
import ValidateRequest from '../../middleware/ValidateRequest';
import { createStudentValidationSchema } from '../students/student.validation';



const router = express.Router();

// will call controller function
router.post('/create-student',ValidateRequest(createStudentValidationSchema),UserController.createStudent);


export const UserRoutes = router;