import { createSlice } from "@reduxjs/toolkit";


interface AuthState {
    isModalOpen: boolean;
    user: any | null;
}

const initialState: AuthState = {
    isModalOpen: false,
    user: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isModalOpen: false,
        user: null as { uid: string; email: string | null} | null,
    },
    reducers: {
        openLoginModal: (state) => {
            state.isModalOpen = true;
        },
        closeLoginModal: (state) => {
            state.isModalOpen = false;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null; 
        },
    },
});

export const { openLoginModal, closeLoginModal, setUser } = authSlice.actions;

export default authSlice.reducer;