import { Book } from "@/lib/api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface FavoritesState {
    items: Book[];
}

const initialState: FavoritesState = {
    items: [],

};

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState, 
    reducers: {
        toggleFavorite: (state, action: PayloadAction<Book>) => {
            const exists = state.items.find(book => book.id === action.payload.id);
            if (exists) {
                state.items = state.items.filter(book => book.id !== action.payload.id);
            } else {
                state.items.push(action.payload);
            }
          },
          setFavorites: (state, action: PayloadAction<Book[]>) => {
            state.items = action.payload;
        },
        },
    });

    export const { toggleFavorite, setFavorites } = favoritesSlice.actions;
    export default favoritesSlice.reducer;
