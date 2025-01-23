import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {
  getDocs,
  collection,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import {FIREBASE_DB} from '../../../FirebaseConfig';

interface Product {
  id: string;
  productName: string;
  price: number;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, {rejectWithValue}) => {
    try {
      const querySnapshot = await getDocs(collection(FIREBASE_DB, 'products'));
      const products: Product[] = [];

      querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        const data = doc.data();

        if (data.Products && Array.isArray(data.Products)) {
          data.Products.forEach((product: any) => {
            if (
              product.id &&
              product.productName &&
              typeof product.price === 'number'
            ) {
              products.push({
                id: product.id,
                productName: product.productName,
                price: product.price,
              });
            } else {
              console.warn(
                `Invalid product format: ${JSON.stringify(product)}`,
              );
            }
          });
        } else {
          console.warn(`No valid 'Products' field in document ID: ${doc.id}`);
        }
      });

      return products;
    } catch (error: any) {
      console.error('Error fetching products:', error);
      return rejectWithValue(error.message || 'Failed to fetch products.');
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          state.loading = false;
          state.error = null;
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products.';
      });
  },
});

export default productsSlice.reducer;
