import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../../../store/store';

interface User {
  id: string;
  name: string;
  email: string;
  dob: string;
  avatar?: string;
  subscription?: 'Standard' | 'Pro' | 'Advanced';
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// In-memory storage for user credentials and info
interface UserData {
  password: string;
  name: string;
  dob: string;
  subscription?: 'Standard' | 'Pro' | 'Advanced';
}

let userData: { [email: string]: UserData } = {
  'admin@dapx.ai': {
    password: 'admin123',
    name: 'Admin User',
    dob: '1990-01-01',
    subscription: 'Standard',
  }
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    updateProfile: (state, action: PayloadAction<{ name: string; dob: string }>) => {
      if (state.user) {
        const { name, dob } = action.payload;
        userData[state.user.email] = {
          ...userData[state.user.email],
          name,
          dob
        };
        state.user = {
          ...state.user,
          name,
          dob
        };
      }
    },
    updateSubscription: (state, action: PayloadAction<'Standard' | 'Pro' | 'Advanced'>) => {
      if (state.user) {
        userData[state.user.email] = {
          ...userData[state.user.email],
          subscription: action.payload,
        };
        state.user = {
          ...state.user,
          subscription: action.payload,
        };
      }
    },
    registerUser: (state, action: PayloadAction<{ email: string; password: string; name: string; dob: string }>) => {
      const { email, password, name, dob } = action.payload;
      userData[email] = { password, name, dob, subscription: 'Standard' };
    },
  },
});

export const login = (email: string, password: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(loginStart());
    setTimeout(() => {
      if (userData[email]?.password === password) {
        const userInfo = userData[email];
        dispatch(loginSuccess({
          id: Date.now().toString(),
          name: userInfo.name,
          email: email,
          dob: userInfo.dob,
          avatar: '/path-to-avatar.jpg',
          subscription: userInfo.subscription || 'Standard',
        }));
      } else {
        dispatch(loginFailure('Invalid email or password'));
      }
    }, 1000);
  };
};

export const register = (email: string, password: string, name: string, dob: string) => {
  return (dispatch: AppDispatch) => {
    if (userData[email]) {
      throw new Error('Email already registered');
    }
    dispatch(registerUser({ email, password, name, dob }));
  };
};

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateProfile,
  updateSubscription,
  registerUser,
} = authSlice.actions;

export default authSlice.reducer; 