import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
      />
      <Tabs.Screen
        name="signin"
        options={{ title: "Sign In", headerShown: false }}
      />
    </Tabs>
  );
}
