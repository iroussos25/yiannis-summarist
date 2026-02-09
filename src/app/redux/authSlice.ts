import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AuthState {
    isModalOpen: boolean;
    user: any | null;
    isPremium: boolean;
    isLoading: boolean;
}

const initialState: AuthState = {
    isModalOpen: false,
    user: null,
    isPremium: false,
    isLoading: true,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        openLoginModal: (state) => {
            state.isModalOpen = true;
        },
        closeLoginModal: (state) => {
            state.isModalOpen = false;
        },
        setAuthState: (state, action: PayloadAction<{ user: any; isPremium: boolean }>) => {
            state.user = action.payload.user;
            state.isPremium = action.payload.isPremium;
            state.isLoading = false;
        },
        clearUser: (state) => {
            state.user = null;
            state.isPremium = false;
            state.isLoading = false;
        },
    },
});

export const { openLoginModal, closeLoginModal, setAuthState, clearUser } = authSlice.actions;

export default authSlice.reducer;