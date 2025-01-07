import React from 'react';
import NavBar from './NavBar';
import { Box } from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <Box>
      <NavBar />
      <Box sx={{ mt: 8, p: 2 }}>{children}</Box>
    </Box>
  );
}

export default Layout;
