import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemister } from '../academic Semister/academic_model';
import type { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import type { TUser } from './user-interface';
import { User } from './user-model';
import { generateStudentId } from './user-utils';
import AppError from '../../errors/Apperror';

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

  // created Isolate session

  const session = await mongoose.startSession();

  try { 
    session.startTransaction();
    userData.id = await generateStudentId(admissionSemester);

    // transaction -------- 1

    const result = await User.create([userData], { session });

    // Now create a student and insert _id into studentId

    if(!result.length) {
          throw new AppError(404,'Dont create User')
    }
      //  set id, _id as user
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      (payload.id = result[0].id),
        // embedding id
      (payload.user = result[0]._id);
      // reference id

      // Second transaction --------> 2

      const newStudent = await Student.create([payload],{session});

      if(!newStudent){
        throw new AppError(404,'Dont create Student')
      }

      await session.commitTransaction()
      await session.endSession
      return newStudent;
    
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
      await session.abortTransaction()
      await session.endSession()
      throw new AppError(404,"Some error is occurs")
    }
  
};

export const UserServices = {
  createStudentIntoDB,
};
