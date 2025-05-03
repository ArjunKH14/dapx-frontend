import React, { useState, useEffect } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import Footer from './Footer';

interface MainContentProps {
  isOpen: boolean;
  isMobile: boolean;
}

const MainContent = styled(Box, {
  shouldForwardProp: (prop) => !['isOpen', 'isMobile'].includes(prop as string),
})<MainContentProps>(({ theme, isOpen, isMobile }) => ({
  marginLeft: isMobile ? 0 : (isOpen ? '16rem' : '5rem'),
  transition: 'margin-left 0.3s ease-in-out',
  width: 'auto',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%',
  overflow: 'auto',
  '& > *:first-of-type': {
    flex: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  '& > *:last-child': {
    marginTop: 0,
  },
}));

const ContentWrapper = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
});

const PageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  overflow: 'hidden',
});

const ContentSection = styled(Box)({
  display: 'flex',
  flex: 1,
  marginTop: '4rem', // Height of TopHeader
  position: 'relative',
  overflow: 'hidden',
});

const MobileOverlay = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: theme.zIndex.drawer - 1,
  display: 'none',
  '&.visible': {
    display: 'block',
  },
}));

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isOpen, setIsOpen] = useState(!isMobile);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  return (
    <PageContainer>
      <TopHeader onMenuClick={handleMenuClick} isOpen={isOpen} isMobile={isMobile} />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar isOpen={isOpen} isMobile={isMobile} onMenuClick={handleMenuClick} />
        {isMobile && isOpen && (
          <MobileOverlay 
            className={isOpen ? 'visible' : ''} 
            onClick={() => setIsOpen(false)}
          />
        )}
        <MainContent isOpen={isOpen} isMobile={isMobile}>
          <ContentWrapper>
            <ContentSection>
              {children}
            </ContentSection>
        
          </ContentWrapper>
          <Footer />
        </MainContent>
      </Box>
    </PageContainer>
  );
};

export default Layout; 