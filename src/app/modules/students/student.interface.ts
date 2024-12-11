import type { Model, Types  } from "mongoose";

export type TGuardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
  };

  export type TUserName = {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  

  export type TLocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
  };

  export type TStudent = {
    id: string;
    user: Types.ObjectId;
    name: TUserName;
    gender: 'male' | 'female';
    dateOfBirth?: string;
    email: string;
    avatar?: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-';
    presentAddress: string;
    permanentAddress: string;
    guardian: TGuardian;
    localGuardian: TLocalGuardian;
    profileImg?: string;
    isDeleted: boolean
  };


  export type StudentMethod = {
    isUserExists(id : string): Promise<TStudent | null>
  }

  export type StudentModel = Model<TStudent,never,StudentMethod>;