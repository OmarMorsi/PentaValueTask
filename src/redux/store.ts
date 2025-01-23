import {configureStore} from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import counterReducer from './slices/counterSlice';
import revenueReducer from './slices/revenueSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    counter: counterReducer,
    revenue: revenueReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
