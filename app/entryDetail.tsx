import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Colors } from '@/utils/colors';
import { RootStackParamList } from '@/types/coreTypes';

type EntryDetailRouteProp = RouteProp<RootStackParamList, 'entryDetail'>;

export default function EntryDetailScreen() {
    const route = useRoute<EntryDetailRouteProp>();
    const { title, description, date } = route.params;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.date}>
                {new Date(date).toLocaleDateString()}
            </Text>
            <View style={styles.partingLine} />
            <Text style={styles.description}>{description}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        padding: 20,
        borderRadius: 15,
        backgroundColor: Colors.primary,
        elevation: 5,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.secondary,
        textAlign: 'center',
    },
    date: {
        fontSize: 14,
        marginTop: 15,
        color: Colors.secondary2,
        textAlign: 'center',
    },
    partingLine: {
        height: 5,
        borderRadius: 10,
        backgroundColor: Colors.accent,
        width: '50%',
        alignSelf: 'center',
        marginVertical: 25,
    },
    description: {
        marginRight: 25,
        marginLeft: 25,
        fontSize: 16,
        color: Colors.secondary,
    },
});
