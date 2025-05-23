import { configureStore } from '@reduxjs/toolkit';
import entriesReducer from '@/store/reducers/entriesSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import draftSlice from './reducers/draftSlice';

export const store = configureStore({
  reducer: {
    entries: entriesReducer,
    draft: draftSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 