

import express from 'express';

import { AcademicFacultyValidation } from './academic-faculty-validation';
import { AcademicFacultyController } from './academic-faculty-controller';
import ValidateRequest from '../../middleware/ValidateRequest';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  ValidateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema
  ),
  AcademicFacultyController.createAcademicFaculty
);

router.get(
  '/:facultyId',
  AcademicFacultyController.getSingleAcademicFaculties,
);

router.get('/', AcademicFacultyController.getAllAcademicFaculties);

router.patch(
  '/:facultyId',
  ValidateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema
  ),
  AcademicFacultyController.updateAcademicFaculties,
);

export const AcademicFacultyRoutes = router;
