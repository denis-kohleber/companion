interface Entry {
    id: string;
    title: string;
    description: string;
    uri: string | null;
    date: string;
    isMarked: boolean;
}

type RootStackParamList = {
    Home: undefined;
    entryDetail: Entry;
};

export type { Entry, RootStackParamList };