import React, {FC} from 'react';
import styled from 'styled-components/native';
import Typography from '../constants/Typography';
import {Button, ScrollView, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import colors from '../styles/colors';
import {Dimensions} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';

const HomeComponent: FC<any> = () => {
  const navigation = useNavigation();
  const {
    totalRevenue,
    lastOrderTotal,
    mostOrderedProductsHistory,
    ordersHistory,
  } = useSelector((state: RootState) => state.revenue);

  const getOrdersInLastHour = (
    orders: {total: number; timestamp: number}[],
  ) => {
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    return orders.filter(order => order.timestamp > oneHourAgo);
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const recentOrders = getOrdersInLastHour(ordersHistory);

  const chartData = ordersHistory.map(order => ({
    value: order.total,
    label: new Date(order.timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  }));

  return (
    <SafeAreaViewContainer>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ViewContainer>
          <Typography
            text="Dashboard"
            textAlign="center"
            size={32}
            fontWeight="bold"
            color={colors.darkGrey || '#333'}
          />

          <SectionTitle>Total Revenue Graph</SectionTitle>

          <ButtonContainer>
            <TouchableOpacity onPress={() => navigation.navigate('Details')}>
              <Typography
                text="Make Order Selection"
                size={20}
                fontWeight={'bold'}
                color={colors.green || '#28a745'}
              />
            </TouchableOpacity>
          </ButtonContainer>

          <StatContainer>
            <StatCard>
              <Typography
                text={`Total Revenue: $${totalRevenue.toFixed(2)}`}
                size={18}
                fontWeight="bold"
                color={colors.darkGrey || '#333'}
                textAlign="center"
              />
            </StatCard>
            <StatCard>
              <Typography
                text={`Last Order Total: $${lastOrderTotal.toFixed(2)}`}
                size={18}
                fontWeight="600"
                color={colors.darkGrey || '#333'}
                textAlign="center"
              />
            </StatCard>
          </StatContainer>

          <SectionTitle>Orders over Time</SectionTitle>
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 2,
              color: (opacity = 1) => colors.green,
              labelColor: (opacity = 1) => colors.darkGrey,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: colors.green,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />

          <SectionTitle>Most Ordered Products History</SectionTitle>
          <ProductHistoryContainer>
            {mostOrderedProductsHistory.length > 0 ? (
              mostOrderedProductsHistory.map((product, index) => (
                <Card key={index}>
                  <Typography
                    text={product.name}
                    size={14}
                    fontWeight="bold"
                    color={colors.darkGrey || '#333'}
                    textAlign="center"
                  />
                </Card>
              ))
            ) : (
              <Typography
                text="No most ordered products yet"
                size={14}
                color={colors.grey || '#999'}
                textAlign="center"
              />
            )}
          </ProductHistoryContainer>

          <SectionTitle>Orders in the Last Hour</SectionTitle>
          <OrdersContainer>
            {recentOrders.length === 0 ? (
              <Typography
                text="No orders in the last hour"
                size={14}
                color={colors.grey || '#999'}
                textAlign="center"
              />
            ) : (
              recentOrders.map((order, index) => (
                <Card key={index}>
                  <Typography
                    text={`Total: $${order.total.toFixed(2)}`}
                    size={14}
                    fontWeight="bold"
                    color={colors.darkGrey || '#333'}
                    textAlign="center"
                  />
                  <Typography
                    text={`Time: ${formatTimestamp(order.timestamp)}`}
                    size={12}
                    color={colors.grey || '#999'}
                    textAlign="center"
                  />
                </Card>
              ))
            )}
          </OrdersContainer>
        </ViewContainer>
      </ScrollView>
    </SafeAreaViewContainer>
  );
};

export default HomeComponent;

const SafeAreaViewContainer = styled.SafeAreaView`
  background-color: ${colors.white || '#fff'};
  flex: 1;
`;

const ViewContainer = styled.View`
  background-color: ${colors.white || '#fff'};
  padding: 20px;
  flex: 1;
`;

const ButtonContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
  align-items: center;
`;

const StatContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

const StatCard = styled.View`
  background-color: ${colors.lightGrey || '#f0f0f0'};
  padding: 15px;
  border-radius: 8px;
  width: 48%;
  justify-content: center;
  align-items: center;
`;

const SectionTitle = styled(Typography)`
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  color: ${colors.darkGrey || '#333'};
  text-align: center;
`;

const ProductHistoryContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const OrdersContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Card = styled.View`
  background-color: ${colors.lightGrey || '#f0f0f0'};
  margin: 5px;
  padding: 10px;
  border-radius: 8px;
  width: 45%;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled.TouchableOpacity`
  background-color: ${colors.green || '#28a745'};
  padding: 12px 24px;
  border-radius: 8px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: ${colors.white || '#fff'};
  font-weight: bold;
  font-size: 16px;
`;

const ChartContainer = styled.View`
  margin-top: 20px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${colors.lightGrey || '#f0f0f0'};
`;
