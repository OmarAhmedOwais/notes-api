import { useForm } from "react-hook-form";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Link,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRegisterMutation } from "./authApi";
import { setCredentials } from "./authSlice";
import { registerSchema } from "../../utils/validationSchemas";
import { useAppDispatch } from "../../app/hooks";
import { ApiError, ApiErrorResponse } from "../../utils/apiError";

interface RegisterForm {
  username: string;
  password: string;
  email: string;
}

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await registerUser(data).unwrap();
      dispatch(
        setCredentials({
          token: response.access_token,
          user: response.user,
        })
      );
      navigate("/folders");
    } catch (err: unknown) {
      ApiError(
        err as ApiErrorResponse,
        "An error occurred during registration."
      );
    }
  };

  return (
    <Container maxWidth='xs'>
      <ToastContainer />
      <Box sx={{ mt: 8 }}>
        <Typography variant='h5' gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label='Username'
            fullWidth
            margin='normal'
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            label='Email'
            fullWidth
            margin='normal'
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            type='password'
            label='Password'
            fullWidth
            margin='normal'
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            disabled={isLoading}
            sx={{ mt: 2 }}
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>
        <Box sx={{ mt: 2 }}>
          <Typography variant='body2'>
            Already have an account?{" "}
            <Link component={RouterLink} to='/login'>
              Login here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default RegisterPage;
