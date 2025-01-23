import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  increaseQuantity,
  decreaseQuantity,
} from '../../redux/slices/counterSlice';
import {RootState} from '../../redux/store';
import Typography from '../../constants/Typography';
import colors from '../../styles/colors';

interface ProductCardProps {
  id: string;
  productName: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({id, productName, price}) => {
  const dispatch = useDispatch();
  const quantity = useSelector(
    (state: RootState) => state.counter.quantities[id] || 0,
  );

  return (
    <TouchableOpacity style={styles.cardContainer} disabled>
      <View style={styles.card}>
        <Typography
          text={productName}
          size={18}
          fontWeight={'bold'}
          color={colors.black}
          textAlign="center"
        />
        <View style={styles.priceContainer}>
          <Typography
            text={`$${price.toFixed(2)}`}
            size={16}
            fontWeight="600"
            color={colors.grey}
          />
        </View>
        <View style={styles.counterContainer}>
          <TouchableOpacity
            style={[styles.button, quantity <= 0 && styles.disabledButton]}
            onPress={() => dispatch(decreaseQuantity(id))}
            disabled={quantity <= 0}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => dispatch(increaseQuantity(id))}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 12,
  },
  card: {
    padding: 16,
    backgroundColor: colors.lightGrey,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    elevation: 4,
  },
  priceContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  button: {
    backgroundColor: colors.blue,
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 8,
    minWidth: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: colors.grey,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
});
