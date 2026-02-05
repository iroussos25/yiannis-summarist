import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AuthState {
    isModalOpen: boolean;
    user: any | null;
    isPremium: boolean;
}

const initialState: AuthState = {
    isModalOpen: false,
    user: null,
    isPremium: false,
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
        setUser: (state, action: PayloadAction<AuthState["user"]>) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null; 
        },
        setLogin: (state, action: PayloadAction<AuthState["user"]>) => {
            state.user = action.payload;
            state.isPremium = action.payload?.subscriptionStatus === 'premium';
        },
    },
});

export const { openLoginModal, closeLoginModal, setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;