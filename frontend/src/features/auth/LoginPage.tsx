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
import { useLoginMutation } from "./authApi";
import { setCredentials } from "./authSlice";
import { useAppDispatch } from "../../app/hooks";
import { loginSchema } from "../../utils/validationSchemas";
import { ApiError, ApiErrorResponse } from "../../utils/apiError";

interface LoginForm {
  username: string;
  password: string;
}

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await login(data).unwrap();
      dispatch(
        setCredentials({
          token: response.access_token,
          user: response.user,
        })
      );
      navigate("/folders");
    } catch (err: unknown) {
          ApiError(err as ApiErrorResponse, "An error occurred during Login.");
        }
  };

  return (
    <Container maxWidth='xs'>
      <ToastContainer/>
      <Box sx={{ mt: 8 }}>
        <Typography variant='h5' gutterBottom>
          Login
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
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <Box sx={{ mt: 2 }}>
          <Typography variant='body2'>
            Don't have an account?{" "}
            <Link component={RouterLink} to='/register'>
              Register here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
