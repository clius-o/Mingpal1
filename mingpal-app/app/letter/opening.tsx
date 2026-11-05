// LT00 봉투 연출 — Figma 269:1657. 0.6초 자동 재생 후 본문으로, 누르면 건너뜀. '모션 줄이기'면 정지 화면(누르면 본문).
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Pressable, StyleSheet, View } from 'react-native';
import { img } from '../../src/assets';
import { Screen } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';

const DURATION = 600;

export default function EnvelopeOpening() {
  const [reduceMotion, setReduceMotion] = useState<boolean | null>(null);
  const progress = useRef(new Animated.Value(0)).current;
  const done = useRef(false);
  const go = () => {
    if (done.current) return;
    done.current = true;
    router.replace({ pathname: '/letter/[id]', params: { id: 'maya-4' } });
  };

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion).catch(() => setReduceMotion(false));
  }, []);

  useEffect(() => {
    if (reduceMotion === null) return;
    if (reduceMotion) {
      progress.setValue(1);
      return;
    }
    Animated.timing(progress, { toValue: 1, duration: DURATION, useNativeDriver: true }).start(({ finished }) => {
      if (finished) go();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  const postmarkOpacity = progress.interpolate({ inputRange: [0.4, 1], outputRange: [0, 1], extrapolate: 'clamp' });
  const lift = progress.interpolate({ inputRange: [0, 1], outputRange: [8, 0] });

  return (
    <Screen>
      <Pressable accessibilityRole="button" accessibilityLabel="편지 열기" onPress={go} style={{ flex: 1 }}>
        <Txt v="maru16" color="ink2" style={{ fontSize: 15, lineHeight: 21, textAlign: 'center', marginTop: 160 }}>리스본, 10,400km 떨어진 곳에서</Txt>
        <Animated.View style={[styles.envelopeWrap, { transform: [{ translateY: lift }] }]}>
          <Image source={img.envelope} style={styles.envelope} contentFit="contain" />
          <Image source={img.stampOlive} style={styles.stamp} contentFit="contain" />
          <Animated.View style={[styles.postmark, { opacity: postmarkOpacity }]}>
            <Image source={img.postmark} style={StyleSheet.absoluteFill} contentFit="cover" />
            <Txt v="news14" style={styles.pmText}>4 NOV</Txt>
            <Txt v="news14" style={styles.pmText}>2026</Txt>
          </Animated.View>
        </Animated.View>
        <Txt v="title" style={{ textAlign: 'center', marginTop: 14 }}>{'Maya의 편지가\n도착했어요'}</Txt>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  envelopeWrap: { alignSelf: 'center', width: 359, height: 258, marginTop: 6 },
  envelope: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
  stamp: { position: 'absolute', right: 20, top: 38, width: 62, height: 84 },
  postmark: { position: 'absolute', left: 176, top: 81, width: 150, height: 62, alignItems: 'center', justifyContent: 'center' },
  pmText: { fontSize: 11, lineHeight: 14, textAlign: 'center' },
});
