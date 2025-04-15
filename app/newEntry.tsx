import {
    View,
    ScrollView,
    TextInput,
    Button,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';
import { Colors } from '@/utils/colors';
import { useRouter } from 'expo-router';
import { Entry } from '@/types/coreTypes';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/store/storage';
import { addEntry } from '@/store/reducers/entriesSlice';
import Entypo from '@expo/vector-icons/Entypo';
import {
    clearDraft,
    setDescription,
    setTitle,
} from '@/store/reducers/draftSlice';
import * as FileSystem from 'expo-file-system';

export default function NewEntry() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const title = useAppSelector((state) => state.draft.title);
    const description = useAppSelector((state) => state.draft.description);
    const photoUri = useAppSelector((state) => state.draft.uri);
    const handleSave = async () => {
        if (!title || !description) {
            alert('Bitte fülle alle Felder aus.');
            return;
        }

        let finalUri = photoUri;

        // Save the photo to the document directory
        if (photoUri) {
            const fileName = photoUri.split('/').pop();
            if (!FileSystem.documentDirectory) {
                console.error('Das Dokumentenverzeichnis ist nicht verfügbar.');
                alert('Das Dokumentenverzeichnis ist nicht verfügbar.');
                return;
            }
            const newPath = FileSystem.documentDirectory + fileName;

            try {
                await FileSystem.moveAsync({
                    from: photoUri,
                    to: newPath,
                });
                finalUri = newPath;
            } catch (error) {
                console.error('Fehler beim Speichern des Bildes:', error);
                alert('Fehler beim Speichern des Bildes.');
                return;
            }
        }

        const newEntry: Entry = {
            id: Date.now().toString(),
            title,
            uri: finalUri,
            description,
            date: new Date().toISOString(),
            isMarked: false,
        };

        dispatch(addEntry(newEntry));
        dispatch(clearDraft());
        router.navigate('/(tabs)');
    };

    return (
        <ScrollView>
            <View style={styles.main}>
                <View style={styles.cardContainer}>
                    <TextInput
                        style={styles.titleInput}
                        placeholder="Überschrift"
                        onChangeText={(text) => dispatch(setTitle(text))}
                        value={title || ''}
                    />
                    <TextInput
                        multiline
                        numberOfLines={5}
                        style={styles.descriptionInput}
                        placeholder="Wie war dein Tag?"
                        textAlignVertical="top"
                        onChangeText={(text) => dispatch(setDescription(text))}
                        value={description || ''}
                    />

                    <TouchableOpacity
                        style={styles.cameraContainer}
                        onPress={() => router.navigate('../camera')}
                    >
                        {photoUri ? (
                            <Image
                                source={{ uri: photoUri }}
                                style={{ width: '100%', height: '100%' }}
                            />
                        ) : (
                            <>
                                <Entypo
                                    name="camera"
                                    size={24}
                                    color={Colors.secondary}
                                />
                                <Text>Foto hinzufügen</Text>
                            </>
                        )}
                    </TouchableOpacity>

                    <View style={styles.buttonContainer}>
                        <Button
                            title="Speichern"
                            color={Colors.accent}
                            onPress={handleSave}
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
    cameraContainer: {
        backgroundColor: Colors.primary2,
        height: 300,
        overflow: 'hidden' as 'hidden',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.border,
        gap: 10,
        alignItems: 'center' as 'center',
        justifyContent: 'center' as 'center',
    },
};
