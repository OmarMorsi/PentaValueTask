import React, {FC} from 'react';
import DetailsComponent from '../components/DetailsComponent';

const DetailsScreen: FC<any> = ({navigation}) => {
  return <DetailsComponent navigation={navigation} />;
};

export default DetailsScreen;
