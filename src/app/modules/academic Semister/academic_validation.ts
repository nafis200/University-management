import { z } from "zod";
import { AcademicSemisterCode, AcademicSemisterName, months } from "./academic.constant";


const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemisterName] as [string, ...string[]]), 
    // zod take this type of string
    year: z.string(),
    code: z.enum([...AcademicSemisterCode] as [string, ...string[]]),
    startMonth: z.enum([...months] as [string,...string[]]),
    endMonth: z.enum([...months] as [string,...string[]])
  }),
});

const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemisterName] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    code: z.enum([...AcademicSemisterCode] as [string, ...string[]]).optional(),
    startMonth: z.enum([...months] as [string, ...string[]]).optional(),
    endMonth: z.enum([...months] as [string, ...string[]]).optional(),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema
};
