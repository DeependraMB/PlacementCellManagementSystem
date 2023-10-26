import * as yup from "yup";

export const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .matches(/^[^\s\d]+$/, "Spaces and numbers are not allowed in first name")
    .matches(/^[A-Za-z]+$/, "First name should only contain letters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .matches(/^[A-Za-z\s]+$/, "Last name should only contain letters")
    .matches(/^\D*$/, "Numbers are not allowed in last name"),
  uniregno: yup
    .string()
    .required("University Registration Number is required")
    .matches(
      /^[A-Z0-9]+$/,
      "Uni. Reg. No should contain only capital letters and numbers"
    ),
  gender: yup.string().required("Gender is required"),

  mobno: yup
    .string()
    .required("Mobile Number is required")
    .matches(
      /^[1-9]\d{9}$/,
      "Mobile number must be exactly 10 digits and not start with zero"
    )
    .test("no-repeated-digits", "Repeated digits are not allowed", (value) => {
      const repeatingPattern = /(.)\1{9}/; // Matches repeated digits 10 times
      return !repeatingPattern.test(value);
    })
    .matches(/^\S*$/, "Spaces are not allowed in the mobile number"),
  department: yup.string().required("Department is required"),

  graduationyear: yup
  .string()
  .required("Graduation year is required")
  .matches(
    /^(202[1-4])$/, // Regular expression for years 2021 to 2024
    "Invalid graduation year. Please enter a year between 2021 and 2024."
  ),


  email: yup
    .string()
    .required("Email address is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  otpemail: yup
    .string()
    .required("OTP is required")
    .matches(/^[0-9]+$/, "OTP must contain only numbers")
    .length(6, "OTP must be exactly 6 digits long"),

  batch: yup
    .string()
    .required("Batch is required")
    .oneOf(["A", "B", "C"], "Invalid batch"),
});


