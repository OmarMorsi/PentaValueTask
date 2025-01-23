import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../components/HomeComponent';
import DetailsScreen from '../screens/DetailsScreen';
import colors from '../styles/colors';

const InsideStack = createStackNavigator();

const InsideNavigator = () => {
  return (
    <InsideStack.Navigator
      screenOptions={{
        headerStyle: {
          borderBottomWidth: 0,
          shadowColor: 'transparent',
          elevation: 0,
        },
      }}>
      <InsideStack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <InsideStack.Screen name="Details" component={DetailsScreen} />
    </InsideStack.Navigator>
  );
};

export default InsideNavigator;
