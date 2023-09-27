import React from 'react'
import * as yup from "yup";

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required"),
  lastName: yup
    .string()
    .required("Last name is required"),
  uniregno: yup
    .string()
    .required("University Registration Number is required"),

  gender: yup.string().required("Gender is required"),

  mobno: yup
    .string()
    .required("Mobile Number is required")
    .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits"),

  department: yup.string().required("Department is required"),
  graduationyear: yup
    .string()
    .required("Graduation year is required")
    .matches(/^(19\d{2}|20\d{2})$/, "Invalid graduation year")
    .test("is-valid-year", "Invalid graduation year", (value) => {
      const currentYear = new Date().getFullYear();
      return Number(value) >= 1900 && Number(value) <= currentYear;
    }),

  email: yup
    .string()
    .required("Email address is required")
    .email("Invalid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});
export default validationSchema