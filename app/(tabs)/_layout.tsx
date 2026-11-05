import { Tabs } from 'expo-router';
import { TabBar } from '../../src/components/TabBar';

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: '우편함' }} />
      <Tabs.Screen name="find" options={{ title: '친구 찾기' }} />
      <Tabs.Screen name="learn" options={{ title: '배움' }} />
      <Tabs.Screen name="me" options={{ title: '내 공간' }} />
    </Tabs>
  );
}
