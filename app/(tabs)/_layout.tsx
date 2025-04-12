import { HapticTab } from '@/components/HapticTab';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import { Tabs,useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/utils/colors';
import FontAwesome6 from '@expo/vector-icons/build/FontAwesome6';

export default function TabLayout() {
    const router = useRouter();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.accent,
                headerShown: true,
                headerTitle: () => (
                    <View style={styles.headerTitle}>
                        <View style={styles.brandWrapper}>
                            <FontAwesome
                                name="book"
                                size={32}
                                color={Colors.primary}
                            />
                        </View>

                        <Text style={styles.appTitle}>MyJournal</Text>
                    </View>
                ),
                headerRight: () => (
                    <View style={styles.headerRight}>
                        <Pressable
                            onPress={() => router.navigate('../newPost')}
                        >
                            <FontAwesome6
                                name="pencil"
                                size={24}
                                color={Colors.secondary}
                            />
                        </Pressable>
                    </View>
                ),
                tabBarButton: HapticTab,
                tabBarStyle: {
                    backgroundColor: '#fff',
                    height: 60,
                },
                tabBarIconStyle: {
                    margin: 'auto',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Einträge',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="book" size={28} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    title: 'Favoriten',
                    tabBarIcon: ({ color }) => (
                        <Feather name="bookmark" size={28} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    brandWrapper: {
        backgroundColor: Colors.accent,
        borderRadius: 17,
        padding: 5,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    appTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        paddingBottom: 3,
        color: Colors.secondary,
    },
    headerRight: {
        flexDirection: 'row',
        marginRight: 24,
        gap: 10,
    },
});
