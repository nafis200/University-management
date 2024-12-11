import config from '../../config';
import { AcademicSemister } from '../academic Semister/academic_model';
import type { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import type { TUser } from './user-interface';
import { User } from './user-model';
import { generateStudentId } from './user-utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};

  if (!payload) {
    throw new Error('Student is undefined or null');
  }
  //    see model.ts you just need id,password,role
  if (!password) {
    userData.password = config.default_password as string;
  } else {
    userData.password = password;
  }

  userData.role = 'student';

  // find academic semester info

  const admissionSemester = await AcademicSemister.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new Error('Admission semester not found');
  }

  userData.id = await generateStudentId(admissionSemester);

  const result = await User.create(userData);

  // Now create a student and insert _id into studentId

  if (result) {
    //  set id, _id as user
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (payload.id = result.id),
      // embedding id
      (payload.user = result._id);
    // reference id
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
