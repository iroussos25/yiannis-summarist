
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice'; 
import bookReducer from './bookSlice';
import favoritesReducer from './favoritesSlice'


const rootReducer = combineReducers({
    auth: authReducer,
    book: bookReducer,
    favorites: favoritesReducer,
});

export default rootReducer;