import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { img } from '../assets';
import { colors } from '../theme';
import { Icon } from './primitives';
import { Txt } from './Txt';

const TABS = [
  { name: 'index', label: '우편함', on: img.mailOn, off: img.mailOff },
  { name: 'find', label: '친구 찾기', on: img.searchOff, off: img.searchOff }, // TODO: "on" icon not in Figma export yet
  { name: 'learn', label: '배움', on: img.bookOn, off: img.bookOff },
  { name: 'me', label: '내 공간', on: img.userOff, off: img.userOff }, // TODO: filled "on" user icon is a temporary design (handoff §3)
] as const;

/** mp2/TabBar — 4 tabs, selected = filled icon + bold label + 28px underline. */
type TabBarProps = {
  state: { index: number; routes: { key: string; name: string }[] };
  navigateToTab: (routeKey: string) => void;
};

export function TabBar({ state, navigateToTab }: TabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 17) }]}>
      {TABS.map((t) => {
        const index = state.routes.findIndex((r) => r.name === t.name);
        const selected = state.index === index;
        return (
          <Pressable
            key={t.name}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            accessibilityLabel={t.label}
            style={styles.item}
            onPress={() => navigateToTab(state.routes[index].key)}
          >
            <View style={styles.iconSlot}>
              <Icon source={selected ? t.on : t.off} size={t.name === 'me' ? 24 : 28} />
            </View>
            <Txt v={selected ? 'meta12Strong' : 'meta12'} color={selected ? 'ink' : 'sub'}>{t.label}</Txt>
            <View style={[styles.underline, !selected && { opacity: 0 }]} />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', paddingTop: 13, backgroundColor: colors.paper, borderTopWidth: 1, borderTopColor: colors.lineStrong },
  item: { flex: 1, minHeight: 54, alignItems: 'center', justifyContent: 'center', gap: 4 },
  iconSlot: { height: 28, width: 30, alignItems: 'flex-start' },
  underline: { height: 2, width: 28, backgroundColor: colors.ink },
});
