import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '@/store/storage';

export default function RootLayout() {
    return (
        <Provider store={store}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                    name="newEntry"
                    options={{
                        title: 'Neuer Eintrag',
                        headerTitleAlign: 'center',
                    }}
                />
                <Stack.Screen
                    name="entryDetail"
                    options={{ title: 'Eintrag' }}
                />
                <Stack.Screen name="+not-found" />
            </Stack>
        </Provider>
    );
}
