import React from 'react';
import { Box, Container, IconButton, Typography, Link, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

const FooterWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#1E1E2D',
  width: '100%',
  paddingTop: theme.spacing(2.5),
  paddingBottom: theme.spacing(2.5),
  marginTop: 'auto',
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

const FooterContainer = styled(Container)(({ theme }) => ({
  color: '#fff',
  maxWidth: '100% !important',
  padding: theme.spacing(0, 2.5),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 2),
  },
}));

const FooterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& h6': {
    fontSize: '0.9rem',
    marginBottom: theme.spacing(1),
  },
  '& a, & p': {
    fontSize: '0.8rem',
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(1.5),
    textAlign: 'center',
    '& h6': {
      fontSize: '0.85rem',
    },
    '& a, & p': {
      fontSize: '0.75rem',
    },
  },
}));

const SocialIcons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1.5),
  marginTop: theme.spacing(1.5),
  '& .MuiSvgIcon-root': {
    fontSize: '1.2rem',
  },
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
    '& .MuiSvgIcon-root': {
      fontSize: '1.1rem',
    },
  },
}));

const StyledIconButton = styled(IconButton)({
  color: '#fff',
  padding: '8px',
  '&:hover': {
    color: '#4CAF50',
  },
}) as typeof IconButton;

const StyledLink = styled(Link)(({ theme }) => ({
  transition: 'color 0.2s',
  textDecoration: 'none',
  fontSize: '0.8rem',
  '&:hover': {
    color: '#4CAF50',
    textDecoration: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.5, 0),
    fontSize: '0.75rem',
  },
}));

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <FooterContainer>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FooterSection>
              <Typography variant="h6" gutterBottom>
                Dapx AI
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Empowering traders with advanced AI-driven insights and analytics for smarter trading decisions.
              </Typography>
              <SocialIcons>
                <StyledIconButton component="a" href="https://twitter.com" target="_blank" aria-label="Twitter">
                  <TwitterIcon />
                </StyledIconButton>
                <StyledIconButton component="a" href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                  <LinkedInIcon />
                </StyledIconButton>
                <StyledIconButton component="a" href="https://github.com" target="_blank" aria-label="GitHub">
                  <GitHubIcon />
                </StyledIconButton>
                <StyledIconButton component="a" href="mailto:contact@example.com" aria-label="Email">
                  <EmailIcon />
                </StyledIconButton>
              </SocialIcons>
            </FooterSection>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FooterSection>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <StyledLink href="/dashboard" color="inherit">Dashboard</StyledLink>
                <StyledLink href="/analytics" color="inherit">Analytics</StyledLink>
                <StyledLink href="/journal" color="inherit">Trading Journal</StyledLink>
                <StyledLink href="/insights" color="inherit">AI Insights</StyledLink>
                <StyledLink href="/settings" color="inherit">Settings</StyledLink>
              </Box>
            </FooterSection>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FooterSection>
              <Typography variant="h6" gutterBottom>
                Resources
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <StyledLink href="/documentation" color="inherit">Documentation</StyledLink>
                <StyledLink href="/api" color="inherit">API Access</StyledLink>
                <StyledLink href="/blog" color="inherit">Blog</StyledLink>
                <StyledLink href="/support" color="inherit">Support</StyledLink>
                <StyledLink href="/terms" color="inherit">Terms of Service</StyledLink>
              </Box>
            </FooterSection>
          </Grid>
        </Grid>
        <Typography 
          variant="body2" 
          align="center" 
          sx={{ 
            mt: 2, 
            pt: 2, 
            opacity: 0.7,
            fontSize: '0.75rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          © {currentYear} Dapx AI. All rights reserved.
        </Typography>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer; 