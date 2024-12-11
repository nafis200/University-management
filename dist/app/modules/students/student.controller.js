"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentControllers = void 0;
const student_service_1 = require("./student.service");
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentData: Student } = req.body;
        const result = yield student_service_1.StudentServices.createStudentIntoDB(Student);
        res.status(200).json({
            success: true,
            message: 'Student is create successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: error,
        });
    }
});
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_service_1.StudentServices.getAllStudentIntoDB();
        res.status(200).json({
            success: true,
            message: 'Student is retrived Data successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(200).json({
            success: false,
            message: 'Something went wrong',
            data: error,
        });
    }
});
const getSingleStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const result = yield student_service_1.StudentServices.getSingleStudentIntoDB(studentId);
        res.status(200).json({
            success: true,
            message: 'Student is retrived Data successfully',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
const deleteStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const result = yield student_service_1.StudentServices.deleteStudentIntoDB(studentId);
        res.status(200).json({
            success: true,
            message: 'Student is retrived Data successfully',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudents,
    deleteStudents,
};
