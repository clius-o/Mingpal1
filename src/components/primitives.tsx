import { Image, type ImageSource } from 'expo-image';
import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { img } from '../assets';
import { colors, layout } from '../theme';
import { Txt } from './Txt';

/** Full-screen paper background, respects the top safe area. */
export function Screen({ children, bottomInset = true }: { children: ReactNode; bottomInset?: boolean }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: colors.paper, paddingTop: insets.top, paddingBottom: bottomInset ? insets.bottom : 0 }}>
      {children}
    </View>
  );
}

export function Icon({ source, size = 24, style }: { source: ImageSource | number; size?: number; style?: StyleProp<ViewStyle> }) {
  return <Image source={source} style={[{ width: size, height: size }, style as object]} contentFit="contain" />;
}

/** mp2/BackBar — 44px touch targets. */
export function BackBar({ showMore = false, onMore }: { showMore?: boolean; onMore?: () => void }) {
  return (
    <View style={styles.backBar}>
      <Pressable accessibilityRole="button" accessibilityLabel="뒤로" style={styles.touch} onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}>
        <Icon source={img.back} />
      </Pressable>
      {showMore ? (
        <Pressable accessibilityRole="button" accessibilityLabel="더보기" style={styles.touch} onPress={onMore}>
          <Icon source={img.more} />
        </Pressable>
      ) : null}
    </View>
  );
}

/** mp2/Rule (머리선) */
export function Rule({ thickness = 2, color = 'ink' }: { thickness?: number; color?: keyof typeof colors }) {
  return <View style={{ height: thickness, backgroundColor: colors[color], alignSelf: 'stretch' }} />;
}

/** mp2/Button style=Primary */
export function Button({ label, icon, onPress, disabled }: { label: string; icon?: ImageSource | number; onPress?: () => void; disabled?: boolean }) {
  return (
    <Pressable accessibilityRole="button" accessibilityState={{ disabled }} onPress={onPress} disabled={disabled} style={[styles.button, disabled && { opacity: 0.4 }]}>
      {icon ? <Icon source={icon} size={18} /> : null}
      <Txt v="strong15" color="light">{label}</Txt>
    </Pressable>
  );
}

/** mp2/Badge type=status-new */
export function NewBadge({ label = '새 편지' }: { label?: string }) {
  return (
    <View style={styles.newBadge}>
      <Icon source={img.dotNew} size={7} />
      <Txt v="meta12Medium" color="red">{label}</Txt>
    </View>
  );
}

/** mp2/Badge type=ai — dashed outline. AI output must always be marked (spec §13). */
export function AiBadge() {
  return (
    <View style={styles.aiBadge}>
      <Txt v="meta12Medium" color="sub">AI</Txt>
    </View>
  );
}

export function Avatar({ source, size, bg }: { source: ImageSource | number; size: number; bg: string }) {
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: bg, overflow: 'hidden' }}>
      <Image source={source} style={{ width: size, height: size }} contentFit="cover" />
    </View>
  );
}

/** Small grey zone label ("도착한 편지" …) */
export function ZoneLabel({ children }: { children: string }) {
  return <Txt v="meta12" color="sub">{children}</Txt>;
}

const styles = StyleSheet.create({
  backBar: { height: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 },
  touch: { width: layout.touch, height: layout.touch, alignItems: 'center', justifyContent: 'center' },
  button: { height: 52, backgroundColor: colors.ink, flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center', padding: 16 },
  newBadge: { flexDirection: 'row', gap: 5, alignItems: 'center' },
  aiBadge: { minHeight: 20, paddingHorizontal: 6, paddingVertical: 2, borderWidth: 1, borderStyle: 'dashed', borderColor: colors.sub, borderRadius: 3, alignItems: 'center', justifyContent: 'center' },
});
