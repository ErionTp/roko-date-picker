import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

export default {
  window: {
    width,
    height,
  },
  screen: {
    screenHeight,
    screenWidth,
  },
  isSmallDevice: width < 400,
  headerHeight: height * 0.05,
};
