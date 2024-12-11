"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// UserName Schema
const UserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(1, { message: 'First name is required' })
        .max(20, { message: 'First name must be less than 20 characters' })
        .regex(/^[A-Z][a-z]*$/, {
        message: 'First name must be in capitalize format',
    }),
    middleName: zod_1.z
        .string()
        .max(20, { message: 'Middle name must be less than 20 characters' }),
    lastName: zod_1.z
        .string()
        .min(1, { message: 'Last name is required' })
        .max(20, { message: 'Last name must be less than 20 characters' })
        .regex(/^[A-Za-z]+$/, {
        message: 'Last name must be alphabetic characters only',
    }),
});
// Guardian Schema
const GuardianValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string().min(1, { message: "Father's name is required" }),
    fatherOccupation: zod_1.z
        .string()
        .min(1, { message: "Father's occupation is required" }),
    fatherContactNo: zod_1.z
        .string()
        .min(1, { message: "Father's contact number is required" }),
    motherName: zod_1.z.string().min(1, { message: "Mother's name is required" }),
    motherOccupation: zod_1.z
        .string()
        .min(1, { message: "Mother's occupation is required" }),
    motherContactNo: zod_1.z
        .string()
        .min(1, { message: "Mother's contact number is required" }),
});
// Local Guardian Schema
const LocalGuardianValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Local Guardian's name is required" }),
    occupation: zod_1.z
        .string()
        .min(1, { message: "Local Guardian's occupation is required" }),
    contactNo: zod_1.z
        .string()
        .min(1, { message: "Local Guardian's contact number is required" }),
    address: zod_1.z
        .string()
        .min(1, { message: "Local Guardian's address is required" }),
});
// Student Schema
const studentValidationSchema = zod_1.z.object({
    id: zod_1.z
        .string()
        .min(1, { message: 'Student ID is required' })
        .max(50, { message: 'Student ID must be less than 50 characters' })
        .regex(/^[a-zA-Z0-9]+$/, { message: 'Student ID must be alphanumeric' }),
    password: zod_1.z.string().max(20),
    name: UserNameValidationSchema,
    gender: zod_1.z.enum(['male', 'female'], {
        message: "Gender must be either 'male' or 'female'",
    }),
    dateOfBirth: zod_1.z.string().min(1, { message: 'Date of birth is required' }),
    email: zod_1.z
        .string()
        .email({ message: 'Invalid email address' })
        .min(1, { message: 'Email is required' }),
    contactNo: zod_1.z.string().min(1, { message: 'Contact number is required' }),
    emergencyContactNo: zod_1.z
        .string()
        .min(1, { message: 'Emergency contact number is required' }),
    bloodGroup: zod_1.z
        .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-'], {
        message: "Blood group must be one of 'A+', 'A-', 'B+', 'B-', 'O+', 'O-'",
    })
        .optional(),
    presentAddress: zod_1.z.string().min(1, { message: 'Present address is required' }),
    permanentAddress: zod_1.z
        .string()
        .min(1, { message: 'Permanent address is required' }),
    guardian: GuardianValidationSchema,
    localGuardian: LocalGuardianValidationSchema,
    profileImg: zod_1.z.string().default('default-profile.png'),
    isActive: zod_1.z
        .enum(['active', 'inactive'], {
        message: "Status must be either 'active' or 'inactive'",
    })
        .default('active'),
    isDeleted: zod_1.z.boolean(),
});
// Export the Zod schema
exports.default = studentValidationSchema;
