import React, { useState } from 'react';
import { AppBar, Box, IconButton, Badge, styled, Typography, Stack, Menu, MenuItem, Avatar, Tooltip, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../features/auth/store/authSlice';
import Logout from '@mui/icons-material/Logout';
import dapxLogo from '../assets/dapx-logo-symbol.png';

export interface TopHeaderProps {
  onMenuClick: () => void;
  isOpen: boolean;
  isMobile: boolean;
}

const HeaderContainer = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#1E1E2D',
  color: '#fff',
  position: 'fixed',
  height: '4rem',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0, 3),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 1),
    justifyContent: 'space-between',
  },
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: 'none',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
}));

const BrandName = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 600,
  marginLeft: '0.1rem',
  color: '#fff',
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
}));

const NavContainer = styled(Stack)(({ theme }) => ({
  flexGrow: 1,
  justifyContent: 'center',
  marginLeft: '2rem',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const NavItem = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ active }) => ({
  fontSize: '0.9rem',
  color: active ? '#fff' : 'rgba(255, 255, 255, 0.7)',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  transition: 'color 0.2s ease',
  '&:hover': {
    color: '#fff',
  },
}));

const RightSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    gap: '0.25rem',
    alignItems: 'right',
  },
}));

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '6px',
  },
}));

const MenuIconStyled = styled(Box)(({ theme }) => ({
  padding: '4px',
  borderRadius: '4px',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const TopHeader: React.FC<TopHeaderProps> = ({ onMenuClick, isOpen, isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(null);
  
  const navItems = [
    { text: 'Dashboard', path: '/' },
    { text: 'Journal', path: '/journal' },
    { text: 'Analytics', path: '/analytics' },
    { text: 'AI Insights', path: '/insights' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setSettingsAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleSettingsClose();
    navigate('/profile');
  };

  const handleLogout = () => {
    handleSettingsClose();
    dispatch(logout());
    navigate('/login');
  };

  return (
    <HeaderContainer>
      <IconButton 
        onClick={onMenuClick}
        sx={{ 
          color: 'rgba(255, 255, 255, 0.7)',
          '&:hover': { 
            color: '#fff',
            backgroundColor: 'transparent'
          }
        }}
      >
        <MenuIconStyled>
          {isOpen ? <MenuOpenIcon /> : <MenuIcon />}
        </MenuIconStyled>
      </IconButton>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <img src={dapxLogo} alt="Dapx AI Logo" style={{ width: '10%', height: '10%'}} />
      <BrandName onClick={() => navigate('/')}>
     
      Dapx AI</BrandName>
      </Box>

      <NavContainer direction="row" spacing={2}>
        {navItems.map((item) => (
          <NavItem
            key={item.text}
            active={location.pathname === item.path}
            onClick={() => handleNavClick(item.path)}
          >
            {item.text}
          </NavItem>
        ))}
      </NavContainer>

      <RightSection>
        <IconButtonStyled size="small">
          <SearchIcon />
        </IconButtonStyled>
        <IconButtonStyled size="small">
          <NotificationsIcon />
        </IconButtonStyled>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleSettingsClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={settingsAnchorEl ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={settingsAnchorEl ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: '#2D2D42' }}>
              {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || '?'}
            </Avatar>
          </IconButton>
        </Tooltip>
      </RightSection>

      <Menu
        anchorEl={settingsAnchorEl}
        id="account-menu"
        open={Boolean(settingsAnchorEl)}
        onClose={handleSettingsClose}
        onClick={handleSettingsClose}
        PaperProps={{
          elevation: 6,
          sx: {
            overflow: 'visible',
            mt: 1.5,
            minWidth: 200,
            bgcolor: '#232336',
            color: '#fff',
            borderRadius: 2,
            boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)',
            border: '1px solid #292945',
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: '#232336',
              borderLeft: '1px solid #292945',
              borderTop: '1px solid #292945',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {isAuthenticated ? (
          <>
            <MenuItem onClick={handleProfileClick} sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.06)', color: '#fff' } }}>
              <Avatar sx={{ bgcolor: '#2D2D42' }}>
                {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || '?'}
              </Avatar>
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.06)', color: '#fff' } }}>           
              <ListItemIcon>
                <Logout fontSize="small" sx={{ color: '#fff' }} />
              </ListItemIcon> Logout
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={() => navigate('/login')} sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.06)', color: '#fff' } }}>
              <Typography>Login</Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate('/signup')} sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.06)', color: '#fff' } }}>
              <Typography>Sign Up</Typography>
            </MenuItem>
          </>
        )}
      </Menu>
    </HeaderContainer>
  );
};

export default TopHeader; 