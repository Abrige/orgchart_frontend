import { createSlice } from '@reduxjs/toolkit';
import {jwtDecode} from "jwt-decode";

const initialState = {
    token: null,
    username: null,
    issuedAt: null,
    expiresAt: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            const token = action.payload;
            let decodedToken;
            try {
                // provo la decodifica del token con libreria di terze parti
                decodedToken = jwtDecode(token);
            } catch (error) {
                console.log(error);
            }
            // se siamo riusciti a decodificare il token e non è ancora scaduto, salviamolo
            if (decodedToken && decodedToken.exp > new Date()/1000) {
                state.token = token;
                // dal payload del token possiamo anche prendere username e durata della sua validita' (da iat a exp)
                state.username = decodedToken.sub;
                state.issuedAt = decodedToken.iat;
                state.expiresAt = decodedToken.exp;
            }
        },
        clearToken: (state) => {
            state.token = null;
            state.username = null;
            state.issuedAt = null;
            state.expiresAt = null;
        },
    },
});

export const {
    setToken,
    clearToken,
} = authSlice.actions;

export default authSlice.reducer;
