
import express from 'express'
import { StudentControllers } from './student.controller'
import ValidateRequest from '../../middleware/ValidateRequest'
import { updateStudentValidationSchema } from './student.validation'

const router = express.Router()



router.get('/',StudentControllers.getAllStudents)

router.get('/:studentId',StudentControllers.getSingleStudents)

router.delete('/:studentId',StudentControllers.deleteStudents)

router.patch('/:studentid',ValidateRequest(updateStudentValidationSchema),StudentControllers.UpdateStudents)

export const StudentRoutes = router