import * as yup from 'yup';

export const signInValidations = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const signUpValidations = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
      'Password must contain 8 or more characters, with 1 upper case, 1 lower case and a special character',
    )
    .required('Password must not be emtpy'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  firstName: yup
    .string()
    .required('First name must not be empty')
    .max(30, 'First name must be between 3 and 30 characters')
    .min(3, 'First name must be between 3 and 30 characters'),
  lastName: yup
    .string()
    .required('Last name must not be empty')
    .max(30, 'Last name must be between 3 and 30 characters')
    .min(3, 'Last name must be between 3 and 30 characters'),
  phoneNumber: yup
    .string()
    .required('Phone number required')
    .max(8, 'Phone number must not exceed 8 characters'),
});
