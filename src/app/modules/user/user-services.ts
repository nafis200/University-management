import config from '../../config';
import type { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import type { TUser } from './user-interface';
import { User } from './user-model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};

  if (!studentData) {
    throw new Error('studentData is undefined or null');
  }

  //    see model.ts you just need id,password,role

  if (!password) {
    userData.password = config.default_password as string;
  } else {
    userData.password = password;
  }

  userData.role = 'student';

  userData.id = '200129';

  const result = await User.create(userData);

  // Now create a student and insert _id into studentId

  if (result) {
    //  set id, _id as user
    (studentData.id = result.id),
      // embedding id
      (studentData.user = result._id);
    // reference id
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
