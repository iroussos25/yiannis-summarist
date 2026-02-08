import { Book } from "@/lib/api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookState {
    activeBook: Book | null;
    finishedBooks: Book[];
}

const initialState: BookState = {
    activeBook: null,
    finishedBooks: [],
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
        addToFinished: (state, action: PayloadAction<Book>) => {
            const exists = state.finishedBooks.find(b => b.id === action.payload.id);
            if (!exists) {
                state.finishedBooks.push(action.payload);
            }
        },
        setFinishedBooks: (state, action: PayloadAction<Book[]>) => {
            state.finishedBooks = action.payload;
        },
    },
});

export const { setActiveBook, clearActiveBook, addToFinished, setFinishedBooks } = bookSlice.actions;
export default bookSlice.reducer;
