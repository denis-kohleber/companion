import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="newEntry" options={{
                title: 'Neuer Eintrag',
                headerStyle: {
                    backgroundColor: '#fff',
                },
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="+not-found" />
        </Stack>
    );
}
