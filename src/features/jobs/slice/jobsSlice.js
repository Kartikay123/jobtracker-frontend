import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: { search: '', company: '', tag: null },
  selectedJobId: null,
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setFilter: (s, a) => {
      s.filters = { ...s.filters, ...a.payload };
    },
    clearFilters: (s) => {
      s.filters = initialState.filters;
    },
    selectJob: (s, a) => {
      s.selectedJobId = a.payload;
    },
  },
});

export const { setFilter, clearFilters, selectJob } = jobsSlice.actions;
export const selectJobFilters = (s) => s.jobs.filters;
export const selectSelectedJobId = (s) => s.jobs.selectedJobId;
export default jobsSlice.reducer;
