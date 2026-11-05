// Bottom sheet over the previous screen (AI01 / AI02 / MB06 pattern): dim backdrop, grabber, title row with close.
import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { img } from '../assets';
import { colors } from '../theme';
import { Icon } from './primitives';
import { Txt } from './Txt';

export function Sheet({ title, aiNote, closeLabel, children, dim = 0.45, surface = colors.card, maxHeight }: {
  title: string;
  aiNote?: string;
  /** Text close action (MB06 "닫기"); when omitted an × icon is shown. */
  closeLabel?: string;
  children: ReactNode;
  dim?: number;
  surface?: string;
  maxHeight?: number;
}) {
  const close = () => router.back();
  return (
    <View style={[styles.root, { backgroundColor: `rgba(34,32,28,${dim})` }]}>
      <Pressable accessibilityLabel="시트 닫기" style={StyleSheet.absoluteFill} onPress={close} />
      <View style={[styles.sheet, { backgroundColor: surface, maxHeight }]}>
        <View style={styles.grabber} />
        <View style={styles.titleRow}>
          <Txt v="maru16" style={[{ flexShrink: 1 }, closeLabel ? { fontSize: 22, lineHeight: 28 } : { fontSize: 17, lineHeight: 24 }]}>{title}</Txt>
          {aiNote ? <Txt v="meta12" color="sub" numberOfLines={1} style={{ marginLeft: 12, flexShrink: 0 }}>{aiNote}</Txt> : null}
          <Pressable accessibilityRole="button" accessibilityLabel="닫기" style={styles.close} onPress={close}>
            {closeLabel ? <Txt v="body14Medium" color="sub">{closeLabel}</Txt> : <Icon source={img.close} size={22} />}
          </Pressable>
        </View>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  sheet: { borderTopWidth: 1, borderTopColor: colors.lineMid, paddingTop: 8, paddingHorizontal: 24, paddingBottom: 24, gap: 14, shadowColor: '#332b1a', shadowOpacity: 0.12, shadowRadius: 12, shadowOffset: { width: 0, height: -6 }, elevation: 8 },
  grabber: { alignSelf: 'center', width: 36, height: 4, borderRadius: 2, backgroundColor: colors.line },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  close: { marginLeft: 'auto', minWidth: 44, height: 44, marginRight: -11, alignItems: 'center', justifyContent: 'center' },
});
