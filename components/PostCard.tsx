import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '@/utils/colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface Props {
    title: string;
    description: string;
}

export default function PostCard({ title, description }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.rectangle} />
            <View style={styles.main}>
                <View style={styles.cardHeader}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => console.log('Button pressed')}
                        >
                            <FontAwesome
                                name="bookmark"
                                size={24}
                                color={Colors.border}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => console.log('Button pressed')}
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
        </View>
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
