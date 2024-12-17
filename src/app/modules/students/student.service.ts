import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import AppError from '../../errors/Apperror';
import { User } from '../user/user-model';
import Querybuilders from '../../builders/Querybuilders';
import { studentSearchFields } from './student.constant';

const createStudentIntoDB = async (studentData: TStudent) => {
  //  const result = await Student.create(studentData)
  const student = new Student(studentData);
  if (await student.isUserExists(studentData.id)) {
    throw new Error('User already exists');
  }

  const result = await student.save();
  return result;
};

// for partial match
// {email: {$regex: query.searchTerm, $options: i} }

//   const queryobj = {...query}

//   let searchTerm = ''

//   if(query?.searchTerm){
//       searchTerm = query?.searchTerm as string
//   }

// const studentSearchFields = ['email','name.firstName','presentAddress']

//   // filtering

//   const excludeFields = ['searchTerm','sort','limit','page','fields']

//   excludeFields.forEach(el => delete queryobj[el])

//   const seachQuery = Student.find({
//     $or: studentSearchFields.map((field)=>({
//       [field]: {$regex: searchTerm, $options: 'i'}
//     }))
//  })

//   const filterQuery =  seachQuery.find(queryobj)
//     .populate('admissionSemester')
//     .populate({
//       path: 'academicDepartment',
//       populate: {
//         path: 'academicFaculty',
//       },
//     });

//   let sort = '-createdAt'
//   if(query.sort){
//     sort = query.sort as string
//   }

//   const sortQuery =  filterQuery.sort(sort)

//   let page = 1
//   let limit = 1
//   let skip = 0

//   if(query.limit){
//     limit = Number(query.limit)
//   }

//   if(query.page){
//      page = Number(query.page)
//      skip = (page - 1) * limit
//   }

//   const paginateQuery = sortQuery.skip(skip)

//   const limitQuery = paginateQuery.limit(limit)

//   // field limiting

//   let fields = '-__v'

//   if(query.fields){
//     fields = (query.fields as string).split(',').join(' ')
//   }

//   const fieldQuery = await limitQuery.select(fields)

//   return fieldQuery;

const getAllStudentIntoDB = async (query: Record<string, unknown>) => {
  // const students = await Student.find()
  //         .populate('admissionSemester')
  //         .populate({
  //             path:'academicDepartment',
  //             populate:{
  //                 path:'academicFaculty'
  //             }
  //         });

  //     return students;

  const studentQuery = new Querybuilders(Student.find(), query)
    .search(studentSearchFields)
    .filter()
    .sort()
    .paginate();

  const result = await studentQuery.modelQuery
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  return result;
};
const getSingleStudentIntoDB = async (id: string) => {
  // const result = await Student.findOne({id})
  // return result;

  const result = await Student.aggregate([
    {
      $match: { id: id },
    },
  ]);
  return result;
};

const deleteStudentIntoDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(400, 'Failed to delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(400, 'Failed to delete User');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const UpdateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...reaminingData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = { ...reaminingData };

  // object keyType:String, and value Unknown

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`gurdian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentIntoDB,
  getSingleStudentIntoDB,
  UpdateStudentIntoDB,
  deleteStudentIntoDB,
};
