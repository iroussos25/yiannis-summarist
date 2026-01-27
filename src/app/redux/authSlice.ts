import { createSlice, PayloadAction } from "@reduxjs/toolkit";


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
    initialState,
    reducers: {
        openLoginModal: (state) => {
            state.isModalOpen = true;
        },
        closeLoginModal: (state) => {
            state.isModalOpen = false;
        },
        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        }
    }
});

export const { openLoginModal, closeLoginModal, setUser } = authSlice.actions;

export default authSlice.reducer;