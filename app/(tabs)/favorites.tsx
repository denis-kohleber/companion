import { View, Text, ScrollView } from 'react-native';
import React from 'react';

export default function Favorites() {
    return (
        <ScrollView>
            <View style={styles.main}></View>
        </ScrollView>
    );
}

const styles = {
    main: {
        padding: 15,
        flex: 1,
        gap: 10,
    },
};
