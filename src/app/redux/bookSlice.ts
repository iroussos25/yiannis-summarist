import { Book } from "@/lib/api";
import { createSlice,PayloadAction } from "@reduxjs/toolkit";


interface BookState {
    activeBook: Book | null;
}

const initialState: BookState = {
    activeBook: null,

};

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        setActiveBook: (state, action: PayloadAction<Book>) => {
            state.activeBook = action.payload;
        },
        clearActiveBook: (state) => {
            state.activeBook = null;
        },
    },
});

export const { setActiveBook, clearActiveBook } = bookSlice.actions;
export default bookSlice.reducer;