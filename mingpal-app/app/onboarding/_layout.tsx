import { Stack } from 'expo-router';
import { colors } from '../../src/theme';

/** Sign-up flow ON01–ON10. Not gated yet: there is no auth, so these routes are reached by link (/onboarding). */
export default function OnboardingLayout() {
  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.paper } }} />;
}
