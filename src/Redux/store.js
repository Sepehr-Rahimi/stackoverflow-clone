import { configureStore } from "@reduxjs/toolkit";
import CounterSlicer from "./CounterSlicer";



const store = configureStore({
    reducer : {
        counter : CounterSlicer
    }
})

export default store