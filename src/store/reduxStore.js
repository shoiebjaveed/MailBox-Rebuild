import { configureStore } from "@reduxjs/toolkit";
import mailSlice from "./mailSlice";


const reduxStore = configureStore({
    reducer: { mail: mailSlice.reducer }
});

export default reduxStore;