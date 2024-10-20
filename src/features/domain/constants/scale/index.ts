import { layout } from "../layout";

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const screenSize = Math.sqrt(layout.width * layout.height) / 100;

const scale = (size: number) => (layout.width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (layout.height / guidelineBaseHeight) * size;

export { scale, verticalScale, screenSize };
