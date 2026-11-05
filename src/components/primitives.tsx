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

/** Settings list row: label (+ optional value) and a right chevron. 55px rows with a hairline (ME01). */
export function SettingsRow({ label, value, onPress, danger, hideChevron }: { label: string; value?: string; onPress?: () => void; danger?: boolean; hideChevron?: boolean }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={rowStyles.row}>
      <Txt v="maru16" color={danger ? 'red' : 'ink'} style={rowStyles.label}>{label}</Txt>
      {value ? <Txt v="caption13" color="sub">{value}</Txt> : null}
      {hideChevron ? null : <Icon source={img.chevron} style={{ transform: [{ rotate: '180deg' }] }} />}
    </Pressable>
  );
}

const rowStyles = StyleSheet.create({
  row: { minHeight: 55, flexDirection: 'row', alignItems: 'center', gap: 8, borderBottomWidth: 1, borderBottomColor: colors.line },
  label: { flex: 1 },
});

/** Sub-page header: BackBar + 28px title + head rule (+ optional right text action, e.g. 저장). */
export function PageHeader({ title, action, onAction, back = true, step, hideTitle }: { title: string; action?: string; onAction?: () => void; back?: boolean; step?: number; hideTitle?: boolean }) {
  return (
    <View>
      <View style={styles.backBar}>
        {back ? (
          <Pressable accessibilityRole="button" accessibilityLabel="뒤로" style={styles.touch} onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}>
            <Icon source={img.back} />
          </Pressable>
        ) : <View style={styles.touch} />}
        {action ? (
          <Pressable accessibilityRole="button" style={[styles.touch, { width: undefined, paddingHorizontal: 14 }]} onPress={onAction}>
            <Txt v="strong15">{action}</Txt>
          </Pressable>
        ) : null}
      </View>
      {step ? <OnboardingProgress step={step} /> : null}
      {hideTitle ? null : (
        <View style={{ paddingHorizontal: layout.screenPadding, gap: 8, marginTop: 4 }}>
          <Txt v="title">{title}</Txt>
          <Rule />
        </View>
      )}
    </View>
  );
}

/** Progress segments drawn inside the header row (see Progress in onboarding.tsx). */
function OnboardingProgress({ step }: { step: number }) {
  return (
    <View pointerEvents="none" style={{ position: 'absolute', left: 64, right: 48, top: 22, flexDirection: 'row', gap: 4 }}>
      {Array.from({ length: 7 }, (_, i) => (
        <View key={i} style={{ flex: 1, height: 3, backgroundColor: i < step ? colors.ink : colors.line }} />
      ))}
    </View>
  );
}

/** mp2 toggle, 48x28, 44px touch target. */
export function Toggle({ value, onValueChange, label }: { value: boolean; onValueChange: (v: boolean) => void; label: string }) {
  return (
    <Pressable accessibilityRole="switch" accessibilityLabel={label} accessibilityState={{ checked: value }} onPress={() => onValueChange(!value)} style={{ width: 48, height: 44, justifyContent: 'center' }}>
      <View style={{ width: 48, height: 28, borderRadius: 14, backgroundColor: value ? colors.ink : colors.lineMid, justifyContent: 'center', paddingHorizontal: 3 }}>
        <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: value ? colors.light : colors.card, alignSelf: value ? 'flex-end' : 'flex-start' }} />
      </View>
    </Pressable>
  );
}

/** Row with a title (+ optional description) and a toggle on the right. */
export function ToggleRow({ label, desc, value, onValueChange }: { label: string; desc?: string; value: boolean; onValueChange: (v: boolean) => void }) {
  return (
    <View style={[rowStyles.row, { paddingVertical: 8, alignItems: 'flex-start' }]}>
      <View style={{ flex: 1, gap: 2, paddingTop: 4, paddingRight: 24 }}>
        <Txt v="maru16">{label}</Txt>
        {desc ? <Txt v="caption13" color="sub">{desc}</Txt> : null}
      </View>
      <Toggle value={value} onValueChange={onValueChange} label={label} />
    </View>
  );
}

/** Radio-style row (ME05 "바로 받기"): ink dot when selected. */
export function RadioRow({ label, value, selected, onPress }: { label: string; value?: string; selected: boolean; onPress?: () => void }) {
  return (
    <Pressable accessibilityRole="radio" accessibilityState={{ selected }} onPress={onPress} style={[rowStyles.row, { gap: 12 }]}>
      <View style={{ width: 18, height: 18, borderRadius: 9, borderWidth: 1, borderColor: selected ? colors.ink : colors.lineStrong, backgroundColor: selected ? colors.ink : 'transparent' }} />
      <Txt v="maru16" style={rowStyles.label}>{label}</Txt>
      {value ? <Txt v="caption13" color="sub">{value}</Txt> : null}
      {value ? <Icon source={img.chevron} style={{ transform: [{ rotate: '180deg' }] }} /> : null}
    </Pressable>
  );
}

/** Small grey section label (Pretendard SemiBold 12). */
export function SectionLabel({ children }: { children: string }) {
  return <Txt v="meta12Strong" color="sub" style={{ marginTop: 16, marginBottom: 4 }}>{children}</Txt>;
}

/** Grey 13px explanatory note under a list. */
export function Note({ children }: { children: string }) {
  return <Txt v="caption13" color="sub" style={{ marginTop: 16 }}>{children}</Txt>;
}

/** Secondary (outlined) small button, e.g. 차단 해제. 44px touch target. */
export function SmallButton({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={{ minHeight: 44, justifyContent: 'center' }}>
      <View style={{ height: 36, paddingHorizontal: 14, justifyContent: 'center', backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line }}>
        <Txt v="body14Medium">{label}</Txt>
      </View>
    </Pressable>
  );
}

/** "· text" list used on confirmation screens (ME09, SF02, SF03). */
export function Bullets({ items }: { items: string[] }) {
  return (
    <View style={{ gap: 10 }}>
      {items.map((t) => (
        <View key={t} style={{ flexDirection: 'row', gap: 10 }}>
          <Txt v="strong15" color="sub" style={{ lineHeight: 24 }}>·</Txt>
          <Txt v="maru16" color="ink2" style={{ flex: 1, fontSize: 15, lineHeight: 24 }}>{t}</Txt>
        </View>
      ))}
    </View>
  );
}

/** Outlined 52px button (mp2/Button style=Secondary). */
export function SecondaryButton({ label, onPress, disabled, style }: { label: string; onPress?: () => void; disabled?: boolean; style?: StyleProp<ViewStyle> }) {
  return (
    <Pressable accessibilityRole="button" accessibilityState={{ disabled }} disabled={disabled} onPress={onPress} style={[{ height: 52, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line }, disabled && { opacity: 0.35 }, style]}>
      <Txt v="strong15">{label}</Txt>
    </Pressable>
  );
}

/** Bottom action area: one or two buttons side by side. */
export function FooterActions({ children }: { children: ReactNode }) {
  return <View style={{ flexDirection: 'row', gap: 12, paddingHorizontal: layout.screenPadding, paddingBottom: 16 }}>{children}</View>;
}

/** ES01 empty state: 190px illustration, title, sentence, optional action. Wording stays calm — never blames the user. */
export function EmptyState({ illustration, title, body, actionLabel, onAction }: { illustration: ImageSource | number; title: string; body: string; actionLabel?: string; onAction?: () => void }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: 54 }}>
      <Image source={illustration} style={{ width: 190, height: 190 }} contentFit="contain" />
      <Txt v="maru18" style={{ marginTop: 24, textAlign: 'center' }}>{title}</Txt>
      <Txt v="maru16" color="ink2" style={{ marginTop: 6, fontSize: 15, lineHeight: 22, textAlign: 'center' }}>{body}</Txt>
      {actionLabel ? (
        <View style={{ width: 200, marginTop: 34 }}>
          <Button label={actionLabel} onPress={onAction} />
        </View>
      ) : null}
    </View>
  );
}

/** SY02 offline / refresh-failed notice. Keeps the list below untouched and never auto-sends drafts. */
export function OfflineBanner({ title = '연결되지 않았어요', body, onRetry }: { title?: string; body: string; onRetry?: () => void }) {
  return (
    <View style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, paddingHorizontal: 13, paddingTop: 11, gap: 3 }}>
      <Txt v="strong14" style={{ lineHeight: 20 }}>{title}</Txt>
      <Txt v="caption13" color="sub">{body}</Txt>
      <Pressable accessibilityRole="button" onPress={onRetry} style={{ minHeight: 44, justifyContent: 'center', alignSelf: 'flex-start', paddingRight: 24 }}>
        <Txt v="strong14" style={{ lineHeight: 20 }}>다시 시도</Txt>
      </Pressable>
    </View>
  );
}

/** ES02 loading skeleton row: circle + two bars. Show structure only, never the empty-state copy while loading. */
export function SkeletonRow({ label }: { label?: string }) {
  return (
    <View style={{ height: 88, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, borderRadius: 14, paddingHorizontal: 13, paddingTop: 6 }}>
      {label ? <Txt v="meta12" color="sub" style={{ lineHeight: 22 }}>{label}</Txt> : null}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 4 }}>
        <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors.lineSoft }} />
        <View style={{ gap: 8 }}>
          <View style={{ width: 110, height: 10, borderRadius: 5, backgroundColor: colors.lineSoft }} />
          <View style={{ width: 230, height: 10, borderRadius: 5, backgroundColor: colors.lineSoft }} />
        </View>
      </View>
    </View>
  );
}
