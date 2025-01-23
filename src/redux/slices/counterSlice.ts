import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CounterState {
  quantities: {[id: string]: number};
}

const initialState: CounterState = {
  quantities: {},
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.quantities[productId] = (state.quantities[productId] || 0) + 1;
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      if (state.quantities[productId] > 0) {
        state.quantities[productId] -= 1;
        if (state.quantities[productId] === 0) {
          delete state.quantities[productId];
        }
      }
    },
    resetQuantities: state => {
      state.quantities = {}; // Reset all quantities to an empty object
    },
  },
});

export const {increaseQuantity, decreaseQuantity, resetQuantities} =
  counterSlice.actions;
export default counterSlice.reducer;
