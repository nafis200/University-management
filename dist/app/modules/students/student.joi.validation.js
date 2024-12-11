"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const UserNameValidationSchema = joi_1.default.object({
    firstName: joi_1.default.string()
        .required()
        .max(20)
        .pattern(/^[A-Z][a-z]*$/, 'first name capitalization')
        .message('{#label} must be in capitalize format'),
    middleName: joi_1.default.string().max(20),
    lastName: joi_1.default.string()
        .required()
        .max(20)
        .regex(/^[A-Za-z]+$/, 'letters only')
        .message('{#label} is not valid'),
});
// Guardian Schema
const GuardianValidationSchema = joi_1.default.object({
    fatherName: joi_1.default.string().required(),
    fatherOccupation: joi_1.default.string().required(),
    fatherContactNo: joi_1.default.string().required(),
    motherName: joi_1.default.string().required(),
    motherOccupation: joi_1.default.string().required(),
    motherContactNo: joi_1.default.string().required(),
});
// Local Guardian Schema
const LocalGuardianValidationSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    occupation: joi_1.default.string().required(),
    contactNo: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
});
// Student Schema
const studentValitaionSchema = joi_1.default.object({
    id: joi_1.default.string().required().max(50).alphanum(),
    name: UserNameValidationSchema.required(),
    gender: joi_1.default.string()
        .valid('male', 'female')
        .required()
        .messages({ 'any.only': 'Gender must be either "male" or "female"' }),
    dateOfBirth: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    contactNo: joi_1.default.string().required(),
    emergencyContactNo: joi_1.default.string().required(),
    bloodGroup: joi_1.default.string().valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-').messages({
        'any.only': "Blood group must be one of 'A+', 'A-', 'B+', 'B-', 'O+', 'O-'",
    }),
    presentAddress: joi_1.default.string().required(),
    permanentAddress: joi_1.default.string().required(),
    guardian: GuardianValidationSchema.required(),
    localGuardian: LocalGuardianValidationSchema.required(),
    profileImg: joi_1.default.string().default('default-profile.png'),
    isActive: joi_1.default.string()
        .valid('active', 'inactive')
        .default('active')
        .messages({ 'any.only': "Status must be either 'active' or 'inactive'" }),
});
exports.default = studentValitaionSchema;
