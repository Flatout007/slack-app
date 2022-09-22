import { createSlice, CreateSliceOptions, PayloadAction, Slice, StateFromReducersMapObject } from "@reduxjs/toolkit";
import { ChannelObject } from "../app/store";


const slice: CreateSliceOptions = {
    name: "channel",

    initialState: {
        roomId: null
    },

    reducers: {
        enterRoom: function (state: StateFromReducersMapObject<ChannelObject>, action: PayloadAction<ChannelObject>): void {
            state.roomId = action.payload.roomId;
        }
    }
};

export const channelSlice: Slice = createSlice(slice);

export const { enterRoom } = channelSlice.actions;

export default channelSlice.reducer;