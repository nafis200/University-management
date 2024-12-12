
import { TStudent } from './student.interface';
import { Student } from './student.model';


const createStudentIntoDB = async (studentData: TStudent) => {
    //  const result = await Student.create(studentData)
    const student = new Student(studentData)
    if(await student.isUserExists(studentData.id)){
        throw new Error('User already exists')
    }

    const result = await student.save()
     return result;
};

const getAllStudentIntoDB = async() =>{
    const students = await Student.find()
            .populate('admissionSemester')
            .populate({
                path:'academicDepartment',
                populate:{
                    path:'academicFaculty'
                }
            });
        
        return students;
}
const getSingleStudentIntoDB = async(id:string) =>{
    // const result = await Student.findOne({id})
    // return result;

    const result = await Student.aggregate([
        {
            $match: {id:id}
        }
    ])
    return result
}

const deleteStudentIntoDB = async(id:string)=>{
    const result = await Student.updateOne({id},{isDeleted: true})
    return result
}



export const StudentServices = {
    createStudentIntoDB,
    getAllStudentIntoDB,
    getSingleStudentIntoDB,
    deleteStudentIntoDB
}

