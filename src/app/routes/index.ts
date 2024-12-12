
import { Router } from 'express';
import { UserRoutes } from '../modules/user/user-route';
import { StudentRoutes } from '../modules/students/student.route';
import { AcademicSemesterRoutes } from '../modules/academic Semister/academic.route';
import { AcademicFacultyRoutes } from '../modules/academic-faculty/academic-faculty-route';
import { AcademicDepartmentRoutes } from '../modules/academic-department/academic-department.route';


const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path:'/academic-departments',
    route:AcademicDepartmentRoutes
  }

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
