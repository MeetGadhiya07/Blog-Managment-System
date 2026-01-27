import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// Root state type
export interface RootState {
  auth: ReturnType<typeof authReducer>;
}

// Store configuration
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// Make store available globally for cross-tab communication
if (typeof window !== 'undefined') {
  (window as typeof window & { __REDUX_STORE__: typeof store }).__REDUX_STORE__ = store;
}

// Export types
export type AppDispatch = typeof store.dispatch;
export type AppState = typeof store.getState;

// Export store
export default store;
