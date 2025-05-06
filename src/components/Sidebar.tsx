import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Dashboard as DashboardIcon,
  CloudUpload as UploadIcon,
  Analytics as AnalyticsIcon,
  Insights as InsightsIcon,
  Settings as SettingsIcon,
  People as PeopleIcon,
  TrendingUp as PerformanceIcon,
  SwapHoriz as TradeIcon,
  LocalOffer as TagsIcon,
  ShowChart as MarketIcon,
  Tag as TickerIcon,
} from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  ListItemButton,
  Collapse,
  Typography,
  Drawer,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

export interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  onMenuClick: () => void;
}

interface SidebarContainerProps {
  isOpen: boolean;
}

const SidebarContainer = styled(Box)<SidebarContainerProps>(({ theme, isOpen }) => ({
  width: isOpen ? '16rem' : '5rem',
  height: '95vh',
  backgroundColor: '#1E1E2D',
  color: '#fff',
  position: 'fixed',
  left: 0,
  top: '4rem',
  bottom: '10rem',
  overflow: 'scroll',
  transition: 'width 0.3s ease-in-out',
  zIndex: theme.zIndex.drawer,
  borderRight: '1px solid rgba(255, 255, 255, 0.1)',
  [theme.breakpoints.down('md')]: {
    width: '16rem',
    position: 'fixed',
    overflow: 'scroll',
  },
}));

const StyledListItemButton = styled(ListItemButton)({
  borderRadius: '4px',
  margin: '2px 8px',
  padding: '8px 12px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

const StyledListItemIcon = styled(ListItemIcon)({
  minWidth: '36px',
  color: '#fff',
});

const StyledListItemText = styled(ListItemText)<{ isOpen: boolean }>(({ isOpen }) => ({
  opacity: isOpen ? 1 : 0,
  transition: 'opacity 0.3s ease-in-out',
  whiteSpace: 'nowrap',
  '& .MuiTypography-root': {
    fontSize: '0.875rem',
  },
}));

const SectionTitle = styled(Typography)<{ isOpen: boolean }>(({ isOpen }) => ({
  fontSize: '0.75rem',
  color: 'rgba(255, 255, 255, 0.7)',
  padding: '16px 20px 8px',
  textTransform: 'uppercase',
  opacity: isOpen ? 1 : 0,
  transition: 'opacity 0.3s ease-in-out',
}));

const SubMenuItem = styled(ListItemButton)({
  padding: '6px 12px 6px 48px',
  margin: '2px 8px',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
});

const menuSections = {
  mainItems: [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Data Upload', icon: <UploadIcon />, path: '/upload' },
  ],
  analysis: [
    { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
    { text: 'Insights', icon: <InsightsIcon />, path: '/insights' },
    { text: 'User Management', icon: <PeopleIcon />, path: '/users' },
  ],
  trading: [
    {
      text: 'Performance',
      icon: <PerformanceIcon />,
      subItems: ['Overview', 'Calendar', 'Snapshot', 'Evaluate', 'Simulator', 'Drawdown'],
    },
    {
      text: 'Trade',
      icon: <TradeIcon />,
      subItems: ['Hourly', 'Weekday', 'Month', 'Year', 'Entry Price', 'Volume', 'Side'],
    },
  ],
  marketData: [
    {
      text: 'Tags',
      icon: <TagsIcon />,
      subItems: [
        { text: 'Setup', path: '/tags/setups' },
        { text: 'Mistakes', path: '/tags/mistakes' }
      ],
    },
    {
      text: 'Market',
      icon: <MarketIcon />,
      subItems: ['Opening Gap $', 'Opening Gap %', 'Index Change %'],
    },
  ],
  settings: [
    {
      text: 'Options',
      icon: <SettingsIcon />,
      subItems: ['Spreads', 'Call or Put'],
    },
    {
      text: 'Ticker',
      icon: <TickerIcon />,
      subItems: ['Sectors', 'Symbols'],
    }
  ],
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, isMobile, onMenuClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const handleClick = (text: string, path?: string) => {
    if (path) {
      navigate(path);
      if (isMobile) {
        // Close sidebar on mobile after navigation
        handleDrawerClose();
      }
    } else {
      setOpenItems((prev) => ({
        ...prev,
        [text]: !prev[text],
      }));
    }
  };

  const handleDrawerClose = () => {
    if (isMobile) {
      // Trigger the parent's onMenuClick to close the sidebar
      onMenuClick();
    }
  };

  const renderMenuItems = (items: any[]) => {
    return items.map((item) => (
      <React.Fragment key={item.text}>
        <ListItem disablePadding>
          <StyledListItemButton
            onClick={() => handleClick(item.text, item.path)}
            sx={{
              backgroundColor: item.path && location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              justifyContent: !isMobile && !isOpen ? 'center' : 'initial',
            }}
          >
            <StyledListItemIcon>{item.icon}</StyledListItemIcon>
            <StyledListItemText isOpen={isMobile || isOpen} primary={item.text} />
            {(!isMobile && isOpen || isMobile) && item.subItems && (
              openItems[item.text] ? <ExpandLess /> : <ExpandMore />
            )}
          </StyledListItemButton>
        </ListItem>
        {(!isMobile && isOpen || isMobile) && item.subItems && (
          <Collapse in={openItems[item.text]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.subItems.map((subItem: string | { text: string; path: string }) => (
                <ListItem key={typeof subItem === 'string' ? subItem : subItem.text} disablePadding>
                  <SubMenuItem
                    onClick={() => typeof subItem !== 'string' && navigate(subItem.path)}
                  >
                    <StyledListItemText 
                      isOpen={!isMobile && isOpen || isMobile} 
                      primary={typeof subItem === 'string' ? subItem : subItem.text} 
                    />
                  </SubMenuItem>
                </ListItem>
              ))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    ));
  };

  const sidebarContent = (
    <SidebarContainer isOpen={isOpen}>
      <List sx={{ flexGrow: 1, minHeight: 0, paddingBottom: '10%' }}>
        <SectionTitle isOpen={isOpen}>MAIN MENU</SectionTitle>
        {renderMenuItems(menuSections.mainItems)}

        <SectionTitle isOpen={ isOpen}>ANALYSIS</SectionTitle>
        {renderMenuItems(menuSections.analysis)}

        <SectionTitle isOpen={ isOpen}>TRADING</SectionTitle>
        {renderMenuItems(menuSections.trading)}

        <SectionTitle isOpen={ isOpen}>MARKET DATA</SectionTitle>
        {renderMenuItems(menuSections.marketData)}

        <SectionTitle isOpen={ isOpen}>SETTINGS</SectionTitle>
        {renderMenuItems(menuSections.settings)}
      </List>
    </SidebarContainer>
  );

  return isMobile ? (
    <Drawer
      variant="temporary"
      open={isOpen}
      onClose={handleDrawerClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          width: '16rem',
          backgroundColor: '#1E1E2D',
          marginTop: '4rem',
          height: 'calc(100% - 4rem)',
        },
      }}
    >
      {sidebarContent}
    </Drawer>
  ) : (
    sidebarContent
  );
};

export default Sidebar;