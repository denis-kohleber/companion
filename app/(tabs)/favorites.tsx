import { View, ScrollView } from 'react-native';
import React from 'react';
import { Colors } from '@/utils/colors';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/store/storage';
import { Entry } from '@/types/coreTypes';
import { initializeEntries } from '@/store/reducers/entriesSlice';
import EntryCard from '@/components/EntryCard';

export default function Favorites() {
    const dispatch = useAppDispatch();
    const entries = useAppSelector((state) => state.entries.data);
    const isLoading = useAppSelector((state) => state.entries.isLoading);

    useEffect(() => {
        dispatch(initializeEntries());
    }, [dispatch]);

    return (
        <ScrollView>
            <View style={styles.main}>
                {isLoading ? (
                    <View style={styles.loadingSpinnerContainer}>
                        <ActivityIndicator
                            style={styles.loadingSpinner}
                            size={100}
                            color={Colors.accent2}
                        />
                    </View>
                ) : (
                    entries
                        .filter((entry: Entry) => entry.isMarked)
                        .slice()
                        .reverse()
                        .map((entry: Entry) => (
                            <EntryCard
                                key={entry.id}
                                id={entry.id}
                                title={entry.title}
                                description={entry.description}
                                isMarked={entry.isMarked}
                                date={entry.date}
                                uri={entry.uri}
                            />
                        ))
                )}
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
    loadingSpinner: {},
    loadingSpinnerContainer: {
        flex: 1,
        height: 300,
        justifyContent: 'center' as 'center',
        alignItems: 'center' as 'center',
    },
};
