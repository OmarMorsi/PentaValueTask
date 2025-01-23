import React, {FC, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../redux/store';
import styled from 'styled-components/native';
import {NavigationProp} from '@react-navigation/native';
import {Button} from 'react-native';
import ProductsComponent from './ProductsComponents';
import Typography from '../constants/Typography';
import colors from '../styles/colors';
import {fetchProducts} from '../redux/slices/productsSlice';
import {
  addOrderTotal,
  updateMostOrderedProduct,
} from '../redux/slices/revenueSlice';
import {resetQuantities} from '../redux/slices/counterSlice';
import {FIREBASE_AUTH, FIREBASE_DB} from '../../FirebaseConfig';
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';

interface RouterProp {
  navigation: NavigationProp<any, any>;
}

const DetailsComponent: FC<RouterProp> = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {products} = useSelector((state: RootState) => state.products);
  const quantities = useSelector(
    (state: RootState) => state.counter.quantities,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const totalSum = products.reduce((sum, product) => {
    const quantity = quantities[product.id] || 0;
    return sum + product.price * quantity;
  }, 0);

  const user = FIREBASE_AUTH.currentUser;

  const handleSubmit = async () => {
    const orderedProducts = products
      .filter(product => quantities[product.id] > 0)
      .map(product => ({
        id: product.id,
        name: product.productName,
        quantity: quantities[product.id],
      }));

    dispatch(addOrderTotal(totalSum));
    dispatch(resetQuantities());

    if (orderedProducts.length > 0) {
      const mostOrderedProduct = orderedProducts.reduce((prev, current) =>
        prev.quantity > current.quantity ? prev : current,
      );

      dispatch(
        updateMostOrderedProduct({
          id: mostOrderedProduct.id,
          name: mostOrderedProduct.name,
        }),
      );

      if (user) {
        const ordersRef = collection(FIREBASE_DB, 'orders');
        const q = query(ordersRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);

        const orderData = {
          userId: user.uid,
          totalAmount: totalSum,
          orderedProducts: orderedProducts.map(p => p.name),
          timestamp: Timestamp.fromMillis(Date.now()),
        };

        if (querySnapshot.empty) {
          await addDoc(ordersRef, {
            userId: user.uid,
            totalAmount: totalSum,
            orderedProducts: orderedProducts.map(p => p.name),
            timestamp: orderData.timestamp,
          });
          console.log('First order created');
        } else {
          querySnapshot.forEach(async doc => {
            const orderRef = doc.ref;
            await setDoc(
              orderRef,
              {
                orders: [
                  ...doc.data().orders,
                  {
                    ...orderData,
                    timestamp: orderData.timestamp,
                  },
                ],
              },
              {merge: true},
            );
            console.log('Order added to existing collection');
          });
        }
      }
    }

    navigation.navigate('Home');
  };

  return (
    <ViewContainer>
      <Typography
        text={`Total: $${totalSum.toFixed(2)}`}
        size={20}
        fontWeight="bold"
        color={colors.green}
        textAlign="center"
      />
      <ProductsComponent products={products} />
      <Button title="Submit" onPress={handleSubmit} />
      <Button title="Sign Out" onPress={() => FIREBASE_AUTH.signOut()} />
    </ViewContainer>
  );
};

export default DetailsComponent;

const ViewContainer = styled.View`
  background-color: ${colors.white};
  justify-content: space-evenly;
  flex: 1;
  padding-vertical: 20px;
`;
