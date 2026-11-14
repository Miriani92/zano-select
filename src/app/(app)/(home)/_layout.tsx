import { Stack } from 'expo-router';

// Home tab: "See all" screens push on top of Home and keep the tab bar.
export default function HomeLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
