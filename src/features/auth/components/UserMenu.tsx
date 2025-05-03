import React, { useState } from 'react';
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface UserMenuProps {
  isAuthenticated: boolean;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const UserMenu: React.FC<UserMenuProps> = ({ isAuthenticated, user }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate('/profile');
  };

  const handleLogout = () => {
    handleMenuClose();
    // TODO: Implement logout logic
    console.log('Logout');
  };

  return (
    <Box>
      <IconButton
        onClick={handleMenuOpen}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={anchorEl ? 'user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? 'true' : undefined}
      >
        <Avatar
          alt={user?.name || 'User'}
          src={user?.avatar}
          sx={{ width: 32, height: 32 }}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="user-menu"
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {isAuthenticated ? (
          <>
            <MenuItem onClick={handleProfileClick}>
              <Typography>Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Typography>Logout</Typography>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={() => navigate('/login')}>
              <Typography>Login</Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate('/signup')}>
              <Typography>Sign Up</Typography>
            </MenuItem>
          </>
        )}
      </Menu>
    </Box>
  );
};

export default UserMenu; 