import { router } from 'expo-router';

import { EditProfileScreen } from '@/features/profile/presentation/screens/edit-profile-screen';

// /edit-profile — full screen over the tabs, signed-in users only.
export default function EditProfileRoute() {
  return <EditProfileScreen onDone={() => router.back()} />;
}
