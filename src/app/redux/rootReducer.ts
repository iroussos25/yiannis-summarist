
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice'; 
import bookReducer from './bookSlice';


const rootReducer = combineReducers({
    auth: authReducer,
    book: bookReducer,
});

export default rootReducer;