import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { GlobalStyles } from '@mui/material';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Setups from './pages/Tags/Setups';
import { Provider } from 'react-redux';
import { store } from './store/store';
import LoginPage from './features/auth/pages/LoginPage';
import SignupPage from './features/auth/pages/SignupPage';
import ProfilePage from './features/auth/pages/ProfilePage';
import EditProfilePage from './features/auth/pages/EditProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardPage from './features/dashboard/pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute';
import JournalPage from './pages/JournalPage';
import AnalyticsPage from './pages/AnalyticsPage';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1E1E2D',
    },
    secondary: {
      main: '#2D2D42',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{
        body: {
          background: 'linear-gradient(135deg, #f7fafc 0%, #e3e8ee 100%)',
          minHeight: '100vh',
        },
      }} />
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/tags/setups"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Setups />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ProfilePage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-profile"
              element={
                <ProtectedRoute>
                  <Layout>
                    <EditProfilePage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/journal"
              element={
                <ProtectedRoute>
                  <Layout>
                    <JournalPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <Layout>
                    <AnalyticsPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
