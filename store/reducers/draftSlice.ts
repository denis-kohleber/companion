import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const draftSlice = createSlice({
    name: 'draft',
    initialState: {
        title: null as string | null,
        description: null as string | null,
        uri: null as string | null,
    },
    reducers: {
        setTitle: (state, action: PayloadAction<string | null>) => {
            state.title = action.payload;
        },
        setDescription: (state, action: PayloadAction<string | null>) => {
            state.description = action.payload;
        },
        setPhotoUri: (state, action: PayloadAction<string | null>) => {
            state.uri = action.payload;
        },
        clearDraft: (state) => {
            state.uri = null;
            state.title = null;
            state.description = null;
        },
    },
});

export const { setPhotoUri, setDescription, setTitle, clearDraft } =
    draftSlice.actions;
export default draftSlice.reducer;
