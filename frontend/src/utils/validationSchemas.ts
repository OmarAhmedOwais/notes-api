import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username too short')
    .required('Username is required'),
  password: Yup.string().min(6).required('Password is required'),
});

export const registerSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username too short')
    .required('Username is required'),
  password: Yup.string().min(6).required('Password is required'),
  email: Yup.string().email().required('Email is required'),
});