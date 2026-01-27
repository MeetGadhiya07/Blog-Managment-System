import { createSlice } from '@reduxjs/toolkit';

// Initial state - simple and clean
const initialState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  fieldErrors: null,
  success: null,
  isInitialized: false,
  favoritesCount: 0,
};

// Async thunks with centralized error handling
// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async (credentials: LoginForm, { rejectWithValue }) => {
//     try {
//       const response = await login(credentials);
//       return response;
//     } catch (error: unknown) {
//       // const enhancedError = errorHandler.parseError(error);
//       return rejectWithValue(error);
//     }
//   },
// );

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: () => {},
});

// Export actions
export const {} = authSlice.actions;

export default authSlice.reducer;
