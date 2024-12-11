

import express from 'express';
import { AcademicSemisterController } from './academic.controller';

import { AcademicSemesterValidation } from './academic_validation';
import ValidateRequest from '../../middleware/ValidateRequest';

const router = express.Router();

router.post(
  '/create-academic-semester',
  ValidateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemisterController.createAcademicSemester,
);

router.get(
  '/:semesterId',
  AcademicSemisterController.getSingleAcademicSemester,
);

router.get('/', AcademicSemisterController.getAllAcademicSemesters);

router.patch(
  '/:semesterId',
  ValidateRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemisterController.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
