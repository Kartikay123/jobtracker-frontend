import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/slice/authSlice';
import jobsReducer from '@/features/jobs/slice/jobsSlice';
import uiReducer from '@/features/ui/slice/uiSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  jobs: jobsReducer,
  ui: uiReducer,
});
