import channelSlice from "../features/channel-slice";
import { Store } from "redux";
import { configureStore } from "@reduxjs/toolkit";


const store: Store = configureStore({
    reducer: {
        channel: channelSlice
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type ChannelObject = { [key: string]: any };