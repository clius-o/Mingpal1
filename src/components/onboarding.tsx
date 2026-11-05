// Shared building blocks for the sign-up flow (ON01–ON10): progress bar, text field, chips, check rows, footer.
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, TextInput, View, type TextInputProps } from 'react-native';
import { colors, fonts, layout } from '../theme';
import { Button, FooterActions, PageHeader, Rule, Screen } from './primitives';
import { Txt } from './Txt';

/** Screen scaffold: back arrow (+ progress), content area, and a bottom action area. */
export function OnboardingScreen({ step, title, children, primaryLabel, onPrimary, primaryDisabled, secondaryLabel, onSecondary, hint }: {
  step?: number;
  title?: string;
  children: ReactNode;
  primaryLabel?: string;
  onPrimary?: () => void;
  primaryDisabled?: boolean;
  secondaryLabel?: string;
  onSecondary?: () => void;
  hint?: string;
}) {
  return (
    <Screen>
      <PageHeader title={title ?? ''} step={step} hideTitle={!title} />
      {children}
      {hint ? <Txt v="caption13" color="sub" style={{ textAlign: 'center', marginBottom: 8 }}>{hint}</Txt> : null}
      {primaryLabel ? (
        <FooterActions>
          <View style={{ flex: 1 }}><Button label={primaryLabel} onPress={onPrimary} disabled={primaryDisabled} /></View>
        </FooterActions>
      ) : null}
      {secondaryLabel ? (
        <Pressable accessibilityRole="button" onPress={onSecondary} style={styles.link}>
          <Txt v="body14Medium">{secondaryLabel}</Txt>
        </Pressable>
      ) : null}
    </Screen>
  );
}

export function FieldLabel({ children }: { children: string }) {
  return <Txt v="strong14" style={{ fontSize: 13, lineHeight: 18, marginBottom: 6 }}>{children}</Txt>;
}

/** 52px input on a card surface. */
export function Field({ label, style, ...rest }: TextInputProps & { label?: string }) {
  return (
    <View style={{ flex: 1 }}>
      {label ? <FieldLabel>{label}</FieldLabel> : null}
      <TextInput
        placeholderTextColor={colors.sub}
        accessibilityLabel={label}
        {...rest}
        style={[styles.input, style]}
      />
    </View>
  );
}

/** Pill-less (square) selectable chip; 44px touch area via hitSlop. */
export function Chip({ label, selected, onPress }: { label: string; selected?: boolean; onPress?: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      hitSlop={{ top: 4, bottom: 4 }}
      onPress={onPress}
      style={[styles.chip, selected && { backgroundColor: colors.ink, borderColor: colors.ink }]}
    >
      <Txt v={selected ? 'strong14' : 'body14Medium'} color={selected ? 'light' : 'ink'} style={{ fontSize: 13, lineHeight: 18 }}>{label}</Txt>
    </Pressable>
  );
}

export function ChipRow({ children }: { children: ReactNode }) {
  return <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>{children}</View>;
}

/** Checkbox row with an optional "보기" link (ON03 약관). */
export function CheckRow({ label, checked, onToggle, onView }: { label: string; checked: boolean; onToggle: () => void; onView?: () => void }) {
  return (
    <View style={styles.checkRow}>
      <Pressable accessibilityRole="checkbox" accessibilityState={{ checked }} onPress={onToggle} style={styles.checkMain}>
        <View style={styles.box}>{checked ? <View style={{ width: 10, height: 10, backgroundColor: colors.ink }} /> : null}</View>
        <Txt v="body14" style={{ fontSize: 15, lineHeight: 20 }}>{label}</Txt>
      </Pressable>
      {onView ? (
        <Pressable accessibilityRole="link" onPress={onView} style={styles.view}>
          <Txt v="body14Medium" color="sub" style={{ fontSize: 13, lineHeight: 20 }}>보기</Txt>
        </Pressable>
      ) : null}
    </View>
  );
}

/** Radio card with an English sample sentence (ON04 level picker). */
export function LevelCard({ label, sample, selected, onPress }: { label: string; sample: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="radio" accessibilityState={{ selected }} onPress={onPress} style={[styles.level, selected && { borderWidth: 2, borderColor: colors.ink }]}>
      <View style={[styles.radio, selected && { backgroundColor: colors.ink, borderColor: colors.ink }]} />
      <View style={{ flex: 1 }}>
        <Txt v={selected ? 'strong14' : 'body14Medium'} style={{ lineHeight: 20 }}>{label}</Txt>
        <Txt v="news14" color="sub" style={{ lineHeight: 20 }}>{sample}</Txt>
      </View>
    </Pressable>
  );
}

export const contentPadding = { paddingHorizontal: layout.screenPadding } as const;
export { Rule, fonts };

const styles = StyleSheet.create({
  link: { minHeight: 44, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  input: { height: 52, paddingHorizontal: 13, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, color: colors.ink, fontFamily: fonts.prRegular, fontSize: 16 },
  chip: { height: 36, paddingHorizontal: 14, justifyContent: 'center', backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line },
  checkRow: { minHeight: 56, flexDirection: 'row', alignItems: 'center' },
  checkMain: { flex: 1, minHeight: 44, flexDirection: 'row', alignItems: 'center', gap: 12, paddingLeft: 13 },
  box: { width: 20, height: 20, borderWidth: 1.5, borderColor: colors.ink, alignItems: 'center', justifyContent: 'center' },
  view: { minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 },
  level: { minHeight: 54, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 13, paddingVertical: 6, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line },
  radio: { width: 16, height: 16, borderRadius: 8, borderWidth: 1, borderColor: colors.lineStrong },
});
