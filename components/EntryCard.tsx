import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '@/utils/colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/storage';
import { deleteEntry, bookmarkEntry } from '@/store/reducers/entriesSlice';
import { useNavigation } from 'expo-router';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList, Entry } from '@/types/coreTypes';

export default function EntryCard({ title, description, id, isMarked }: Entry) {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const dispatch = useDispatch<AppDispatch>();

    const handleDeleteEntry = (id: string) => {
        dispatch(deleteEntry(id));
    };

    const handleBookmarkEntry = (id: string) => {
        dispatch(bookmarkEntry(id));
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() =>
                navigation.navigate('entryDetail', {
                    id,
                    title,
                    description,
                    isMarked,
                    date: new Date().toISOString(),
                })
            }
        >
            <View style={styles.rectangle} />
            <View style={styles.main}>
                <View style={styles.cardHeader}>
                    <Text
                        style={styles.title}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {title}
                    </Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleBookmarkEntry(id)}
                        >
                            <FontAwesome
                                name="bookmark"
                                size={24}
                                color={
                                    isMarked ? Colors.accent2 : Colors.border
                                }
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleDeleteEntry(id)}
                        >
                            <MaterialCommunityIcons
                                name="trash-can-outline"
                                size={24}
                                color={Colors.secondary2}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text
                    style={styles.description}
                    numberOfLines={4}
                    ellipsizeMode="tail"
                >
                    {description}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        color: Colors.secondary,
        padding: 20,
        borderRadius: 20,
        flexDirection: 'row',
        gap: 20,
        borderWidth: 1,
        borderColor: Colors.border,
        elevation: 5,
    },
    rectangle: {
        height: '100%',
        width: 10,
        backgroundColor: Colors.accent,
        borderRadius: 5,
    },
    main: {
        flex: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: Colors.secondary,
        fontSize: 20,
        fontWeight: 400,
        maxWidth: 210,
    },
    description: {
        color: Colors.secondary,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 6,
        borderRadius: 10,
        width: 40,
        borderColor: Colors.border,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
