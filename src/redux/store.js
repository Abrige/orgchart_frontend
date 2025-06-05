import { configureStore } from '@reduxjs/toolkit';
import companyReducer from './slices/companySlice';
import employeeReducer from './slices/employeeSlice';

export const store = configureStore({
    reducer: {
        company: companyReducer,
        employee: employeeReducer,
    },
});
