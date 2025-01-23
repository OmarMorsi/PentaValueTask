import {Alert, Dimensions, Linking, PixelRatio, Platform} from 'react-native';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export {
  widthPercentageToDP as perfectWidth,
  heightPercentageToDP as perfectHeight,
} from 'react-native-responsive-screen';

export const perfectSize = (size: number) =>
  PixelRatio.roundToNearestPixel(size);
