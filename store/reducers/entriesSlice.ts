import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entry from '@/types/entryType';

// Async thunk to initialize entries from AsyncStorage
export const initializeEntries = createAsyncThunk(
  'entries/initialize',
  async () => {
    const data = await AsyncStorage.getItem('entries');
    return data ? JSON.parse(data) : [];
  }
);

interface EntriesState {
  data: Entry[];
  isLoading: boolean;
}

const initialState: EntriesState = {
  data: [],
  isLoading: false,
};

const entriesSlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {
    // Synchronous actions
    addEntry: (state, action: PayloadAction<Entry>) => {
      state.data.push(action.payload);
      AsyncStorage.setItem('entries', JSON.stringify(state.data));
    },
    deleteEntry: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter(entry => entry.id !== action.payload);
      AsyncStorage.setItem('entries', JSON.stringify(state.data));
    },
  },
  extraReducers: (builder) => {
    // Handle the async thunk actions
    builder
      .addCase(initializeEntries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initializeEntries.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      });
  },
});

export const { addEntry, deleteEntry } = entriesSlice.actions;
export default entriesSlice.reducer;