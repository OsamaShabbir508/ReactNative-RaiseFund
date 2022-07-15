import { Dimensions, PixelRatio } from 'react-native';


let { height, width } = Dimensions.get('window');
const scale = height / 812;

const normalize = (size) => {
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const VerticalSize = (size = 812) => (size / 812) * height;
const HorizontalSize = (size = 375) => (size / 375) * width;

export default {
    Radius: VerticalSize(10),
    LightRadius: VerticalSize(6),
    ActiveOpacity: 0.5,
    customFontSize: normalize,
    FontRegular: normalize(16),
    FontExtraSmall: normalize(12),
    FontSmallest: normalize(10),
    FontSmall: normalize(14),
    FontMedium: normalize(18),
    FontLarge: normalize(22),
    VerticalSize,
    HorizontalSize,
    height: height,
    width: width
};