import EntryCard from '@/components/EntryCard';
import Entry from '@/types/entryType';
import { storage } from '@/utils/storage';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function Index() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [entries, setEntries] = useState<Entry[]>([]);

    useEffect(() => {
        const loadEntries = async () => {
            setIsLoading(true);
            const loadedEntries = await storage.getEntries();
            setEntries(loadedEntries);
            setIsLoading(false);
        };
        loadEntries();
    }, []);

    return (
        <ScrollView>
            <View style={styles.main}>
                 {isLoading && <Text>Wird geladen ...</Text>}
                {entries.slice().reverse().map((entry: Entry) => (
                    <EntryCard
                        key={entry.id}
                        title={entry.title}
                        description={entry.description}
                    />
                ))}
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
};
