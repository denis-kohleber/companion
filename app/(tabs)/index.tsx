import EntryCard from '@/components/EntryCard';
import { initializeEntries } from '@/store/reducers/entriesSlice';
import { useAppDispatch, useAppSelector } from '@/store/storage';
import Entry from '@/types/entryType';
import { Colors } from '@/utils/colors';
import { useEffect } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';

export default function Index() {
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
                        .slice()
                        .reverse()
                        .map((entry: Entry) => (
                            <EntryCard
                                key={entry.id}
                                id={entry.id}
                                title={entry.title}
                                description={entry.description}
                                isMarked={entry.isMarked}
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
