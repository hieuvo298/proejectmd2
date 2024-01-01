import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userSlice } from './reducer/user';



const rootReducer = combineReducers({ 
    user:userSlice.reducer
});

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch