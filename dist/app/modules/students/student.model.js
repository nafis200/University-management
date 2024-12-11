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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const UserNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        maxlength: [20, 'First name less than 20'],
        validate: {
            validator: function (value) {
                const firstName = value.charAt(0) + value.slice(1).toLowerCase();
                if (firstName !== value) {
                    return false;
                }
                return true;
            },
            message: `{VALUE} is not capitalize`
        },
    },
    middleName: {
        type: String,
        maxlength: [20, 'Middle name must be less than 20'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        maxlength: [20, 'Last name must be less than 20'],
        // custom validator
        validate: {
            validator: (value) => validator_1.default.isAlpha(value),
            message: '{VALUE} is not valid',
        },
    },
});
const LocalGuardianSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
});
const studentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, 'Student ID is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Passward Id is required'],
        maxlength: [20, 'password should under 20 character'],
    },
    name: {
        type: UserNameSchema,
        required: [true, 'name is required'],
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: 'gender must be either male or female',
        },
        required: [true, 'gender must be female or male'],
    },
    dateOfBirth: {
        type: String,
        required: [true, 'Date of birth is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    contactNo: {
        type: String,
        required: [true, 'Contact number is required'],
    },
    emergencyContactNo: {
        type: String,
        required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
        type: String,
        enum: {
            values: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-'],
            message: "Blood group must be one of 'A+', 'A-', 'B+', 'B-', 'O+', 'O-'",
        },
    },
    presentAddress: {
        type: String,
        required: [true, 'Present address is required'],
    },
    permanentAddress: {
        type: String,
        required: [true, 'Permanent address is required'],
    },
    localGuardian: {
        type: LocalGuardianSchema,
        required: [true, 'Local Gurdian details are required'],
    },
    profileImg: {
        type: String,
        default: 'default-profile.png',
    },
    isActive: {
        type: String,
        enum: {
            values: ['active', 'inactive'],
            message: "Status must be either 'active' or 'inactive'",
        },
        default: 'active', // Default value
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    toJSON: {
        virtuals: true
    }
});
// virtual 
studentSchema.virtual('fullname').get(function () {
    return `${this.name.firstName} ${this.name.middleName || ''} ${this.name.lastName}`.trim();
});
// pre save middleware/hook: will work create() save()
studentSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        //  console.log(this, 'pre hook: we will save to data');
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        // hasing password and save into db
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
// post save middleware / hook
studentSchema.post('save', function (doc, next) {
    doc.password = ' ';
    // console.log(this, 'post hook: we saveed our data');
    next();
});
// query middleware
studentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    // console.log(this);
    next();
});
studentSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    // console.log(this);
    next();
});
studentSchema.pre('aggregate', function (next) {
    // this.find({isDeleted: {$ne: true}})
    // console.log(this);
    // console.log(this.pipeline());
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
studentSchema.methods.isUserExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.Student.findOne({ id });
        return existingUser;
    });
};
exports.Student = (0, mongoose_1.model)('Student', studentSchema);
