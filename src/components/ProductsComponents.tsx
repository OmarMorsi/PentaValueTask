import React from 'react';
import {FlatList, View, StyleSheet, Dimensions} from 'react-native';
import ProductCard from './Reusable/ProductCard';
import Typography from '../constants/Typography';
import colors from '../styles/colors';

interface ProductsComponentProps {
  products: Array<{
    id: string;
    productName: string;
    price: number;
  }>;
}

const {width} = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const ProductsComponent: React.FC<ProductsComponentProps> = ({products}) => {
  if (products?.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Typography
          text="No products available"
          size={16}
          color={colors.grey}
        />
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <View style={styles.cardContainer}>
          <ProductCard
            id={item.id}
            productName={item.productName}
            price={item.price}
          />
        </View>
      )}
      numColumns={2}
      contentContainerStyle={styles.listContainer}
      columnWrapperStyle={styles.columnWrapper}
    />
  );
};

export default ProductsComponent;

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  cardContainer: {
    width: CARD_WIDTH,
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});
