import { View, Text, StyleSheet, Pressable, Button } from 'react-native';
import React, { useRef, useState } from 'react';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AppDispatch } from '@/store/storage';
import { useDispatch } from 'react-redux';
import { setPhotoUri } from '@/store/reducers/draftSlice';

export default function Camera() {
    const [permission, requestPermission] = useCameraPermissions();
    const ref = useRef<CameraView>(null);
    const [facing, setFacing] = useState<CameraType>('back');
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    if (!permission || !permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>
                    Um Fotos aufzunehmen, wird Zugriff auf die Kamera benötigt.
                </Text>
                <Button
                    onPress={requestPermission}
                    title="Berechtigung erteilen"
                />
            </View>
        );
    }

    const toggleFacing = () => {
        setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
    };

    const takePicture = async () => {
        try {
            const photo = await ref.current?.takePictureAsync();
            if (photo?.uri) {
                dispatch(setPhotoUri(photo.uri));
                router.back();
            }
        } catch (err) {
            console.warn('Error taking picture:', err);
            alert(
                'Es gab ein Problem beim Aufnehmen des Bildes.'
            );
        }
    };

    return (
        <CameraView
            style={styles.camera}
            ref={ref}
            mode="picture"
            facing={facing}
            mute={false}
            responsiveOrientationWhenOrientationLocked
        >
            <View style={styles.shutterContainer}>
                <Pressable onPress={toggleFacing}>
                    <FontAwesome6 name="rotate-left" size={32} color="white" />
                </Pressable>
                <Pressable onPress={takePicture}>
                    {({ pressed }) => (
                        <View
                            style={[
                                styles.shutterBtn,
                                {
                                    opacity: pressed ? 0.5 : 1,
                                },
                            ]}
                        >
                            <View
                                style={[
                                    styles.shutterBtnInner,
                                    {
                                        backgroundColor: 'white',
                                    },
                                ]}
                            />
                        </View>
                    )}
                </Pressable>
            </View>
        </CameraView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    shutterContainer: {
        position: 'absolute',
        bottom: 44,
        left: 0,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 30,
    },
    shutterBtn: {
        backgroundColor: 'transparent',
        borderWidth: 5,
        borderColor: 'white',
        width: 85,
        height: 85,
        borderRadius: 45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    shutterBtnInner: {
        width: 70,
        height: 70,
        borderRadius: 50,
    },
});
