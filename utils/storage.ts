import Entry from '@/types/entryType';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
    getEntries: async () => {
        try {
            const existingEntries = await AsyncStorage.getItem('entries');
            return existingEntries ? JSON.parse(existingEntries) : [];
        } catch (error) {
            console.error('Error retrieving entries from storage:', error);
            return [];
        }
    },

    saveEntries: async (entries: Entry[]) => {
        try {
            await AsyncStorage.setItem('entries', JSON.stringify(entries));
        } catch (e) {
            console.error('Error saving entries:', e);
        }
    },
};
