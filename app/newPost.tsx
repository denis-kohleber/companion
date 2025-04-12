import { View, ScrollView, TextInput, Button } from 'react-native';
import React from 'react';
import { Colors } from '@/utils/colors';
import { useRouter } from 'expo-router';

export default function NewPost() {
    const router = useRouter();

    return (
        <ScrollView>
            <View style={styles.main}>
                <View style={styles.cardContainer}>
                    <TextInput
                        style={styles.titleInput}
                        placeholder="Überschrift"
                    />
                    <TextInput
                        multiline
                        numberOfLines={5}
                        style={styles.descriptionInput}
                        placeholder="Wie war dein Tag?"
                        textAlignVertical="top"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Speichern"
                            onPress={() => console.log('Button betätigt.')}
                            color={Colors.accent}
                        />
                        <Button
                            title="Abbrechen"
                            onPress={() => router.navigate('/(tabs)')}
                            color={Colors.secondary3}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = {
    main: {
        padding: 15,
        flex: 1,
        gap: 10,
    },
    buttonContainer: {
        flexDirection: 'row' as 'row',
        justifyContent: 'space-around' as 'space-around',
        marginTop: 20,
    },
    button: {
        borderRadius: 20,
    },
    cardContainer: {
        backgroundColor: Colors.primary,
        color: Colors.secondary,
        padding: 20,
        borderRadius: 20,
        gap: 20,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    titleInput: {
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 20,
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    descriptionInput: {
        backgroundColor: Colors.primary,
        padding: 10,
        paddingLeft: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.border,
        height: 150,
    },
};