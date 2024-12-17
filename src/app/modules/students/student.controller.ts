import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendresponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// const getAllStudents = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const result = await StudentServices.getAllStudentIntoDB();
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Student data Get successfully',
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const getAllStudents = catchAsync(async (req, res) => {

  // console.log(req.query)

  const result = await StudentServices.getAllStudentIntoDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student data Get successfully',
    data: result,
  });
});

const getSingleStudents = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentIntoDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Student data is Read successfully',
    data: result,
  });
});

const deleteStudents = catchAsync(async (req, res) => {
  const { studentid } = req.params;
  const result = await StudentServices.deleteStudentIntoDB(studentid);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Student data is Read successfully',
    data: result,
  })
});

const UpdateStudents = catchAsync(async (req, res) => {
  
  const { studentid } = req.params;
  const {student} = req.body
  const result = await StudentServices.UpdateStudentIntoDB(studentid,student);
  res.status(200).json({
    success: true,
    message: 'Students is Updated successfully',
    data: result,
  });
});


export const StudentControllers = {
  getAllStudents,
  getSingleStudents,
  deleteStudents,
  UpdateStudents 
};
