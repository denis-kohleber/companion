import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
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

export default function EntryCard({
    title,
    description,
    id,
    isMarked,
    uri,
}: Entry) {
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
                    uri,
                    date: new Date().toISOString(),
                })
            }
        >
            {uri && (
                <View>
                    <Image source={{ uri: uri }} style={styles.image} />
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
            )}
            <View style={styles.main}>
                <View style={styles.cardHeader}>
                    <Text
                        style={styles.title}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {title}
                    </Text>
                    <Text style={styles.date}>
                        {new Date().toLocaleDateString()}
                    </Text>
                </View>
                <Text
                    style={styles.description}
                    numberOfLines={4}
                    ellipsizeMode="tail"
                >
                    {description}
                </Text>
                <View style={styles.rectangle} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        color: Colors.secondary,
        borderRadius: 20,
        borderColor: Colors.border,
        elevation: 5,
        overflow: 'hidden',
    },
    rectangle: {
        height: 5 ,
        width: "100%",
        maxWidth: 100,
        alignSelf: 'center',
        backgroundColor: Colors.accent,
        borderRadius: 5,
        marginTop: 10,
    },
    main: {
        flex: 1,
        padding: 20,
        paddingTop: 15,
        paddingBottom: 12,
        gap: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 20,
    },
    title: {
        color: Colors.secondary,
        fontSize: 20,
        fontWeight: 400,
        maxWidth: 210,
    },
    date: {
        color: Colors.secondary2,
        fontSize: 12,
        fontWeight: 400,
    },
    description: {
        color: Colors.secondary,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        position: 'absolute',
        top: 10,
        right: 10,
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
