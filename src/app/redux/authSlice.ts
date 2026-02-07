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
        setUser: (state, action: PayloadAction<AuthState["user"]>) => {
            state.user = {
                uid: action.payload.uid,
                email: action.payload.email
            };
            state.isPremium = action.payload.isPremium || false;
            state.isLoading = false;
        },
        clearUser: (state) => {
            state.user = null; 
            state.isLoading = false;
        },
        setLogin: (state, action: PayloadAction<AuthState["user"]>) => {
            state.user = action.payload;
            state.isPremium = action.payload?.subscriptionStatus === 'premium';
            state.isLoading = false;
        },
        setPremium: (state, action: PayloadAction<boolean>) => {
            state.isPremium = action.payload;
        },
    },
});

export const { openLoginModal, closeLoginModal, setUser, clearUser, setPremium } = authSlice.actions;

export default authSlice.reducer;