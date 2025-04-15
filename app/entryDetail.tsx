import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Colors } from '@/utils/colors';
import { RootStackParamList } from '@/types/coreTypes';

type EntryDetailRouteProp = RouteProp<RootStackParamList, 'entryDetail'>;

export default function EntryDetailScreen() {
    const route = useRoute<EntryDetailRouteProp>();
    const { title, description, date, uri } = route.params;

    return (
        <ScrollView style={styles.container}>
            {uri ? <Image source={{ uri: uri }} style={styles.image} /> : null}
            <View style={styles.main}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.date}>
                    {new Date(date).toLocaleDateString()}
                </Text>
                <View style={styles.partingLine} />
                <Text style={styles.description}>{description}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        
        borderRadius: 20,
        backgroundColor: Colors.primary,
        elevation: 5,
        borderColor: Colors.border,
    },
    main: {
        padding: 20,
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
    image: {
        width: '100%',
        height: 330,
        borderRadius: 20,
    },
});
