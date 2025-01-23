import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface RevenueState {
  totalRevenue: number;
  lastOrderTotal: number;
  mostOrderedProduct: string | null;
  mostOrderedProductsHistory: {id: string; name: string}[];
  ordersHistory: {total: number; timestamp: number}[];
}

const initialState: RevenueState = {
  totalRevenue: 0,
  lastOrderTotal: 0,
  mostOrderedProduct: null,
  mostOrderedProductsHistory: [],
  ordersHistory: [],
};

const revenueSlice = createSlice({
  name: 'revenue',
  initialState,
  reducers: {
    addOrderTotal: (state, action: PayloadAction<number>) => {
      state.totalRevenue += action.payload;
      state.lastOrderTotal = action.payload;

      state.ordersHistory.push({
        total: action.payload,
        timestamp: Date.now(),
      });
    },
    updateMostOrderedProduct: (
      state,
      action: PayloadAction<{id: string; name: string}>,
    ) => {
      state.mostOrderedProduct = action.payload.name;
      if (action.payload.name) {
        state.mostOrderedProductsHistory.push(action.payload);
      }
    },
  },
});

export const {addOrderTotal, updateMostOrderedProduct} = revenueSlice.actions;
export default revenueSlice.reducer;
