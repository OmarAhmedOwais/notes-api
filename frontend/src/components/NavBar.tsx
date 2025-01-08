import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const { token, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position='fixed'>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant='h6' sx={{ flexGrow: 1 }}>
          Notes API
        </Typography>
        {token ? (
          <>
          <Box sx={{ display: 'flex', gap: 2, mr: 50 }}>
              <Button color="inherit" onClick={() => navigate('/folders')}>
                Folders
              </Button>
              <Button color="inherit" onClick={() => navigate('/notes')}>
                Notes
              </Button>
            </Box>
            <Typography variant='body1' sx={{ mr: 2 }}>
              Hello, {user?.username ?? "User"}
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button color='inherit' onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </>
        ) : (
          <Button color='inherit' onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
