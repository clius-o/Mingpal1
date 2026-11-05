// Paper clip on the letter sheet (LT01 / LT03 / MB07). Coordinates are relative to the sheet's top-left (Figma: sheet at 20,112).
// Back half sits behind the sheet and sticks out above it; the front half is clipped to the sheet area so the clip looks clipped *over* the paper.
import { Image } from 'expo-image';
import { View } from 'react-native';
import { img } from '../assets';

const TILT = '9deg';

/** Render BEFORE the sheet image. */
export function ClipBack() {
  return (
    <View pointerEvents="none" style={{ position: 'absolute', left: 73, top: -10, width: 32.23, height: 68, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={img.clipBack} style={{ width: 22.287, height: 65.318, transform: [{ rotate: TILT }] }} contentFit="cover" accessibilityElementsHidden />
    </View>
  );
}

/** Render AFTER the sheet image. */
export function ClipFront() {
  return (
    <View pointerEvents="none" style={{ position: 'absolute', left: 74.5, top: 0.5, width: 24.5, height: 47, overflow: 'hidden' }}>
      <View style={{ position: 'absolute', left: 0.5, top: -11.5, width: 27.43, height: 58.908, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={img.clipFront} style={{ width: 18.797, height: 56.666, transform: [{ rotate: TILT }] }} contentFit="fill" accessibilityElementsHidden />
      </View>
    </View>
  );
}
