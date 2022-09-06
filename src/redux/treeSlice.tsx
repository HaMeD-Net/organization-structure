import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flag: false,
  unitModalFlag: false,
  postModalFlag: false,
  appointmentModalFlag: false,
  mouseCoordinatesX: null,
  mouseCoordinatesY: null,
  treeUnitsKey: null,
  toastFlag: false,
};

export const treeSlice = createSlice({
  name: "tree",
  initialState,
  reducers: {
    changeFlag: (state, action) => {
      state.flag = action.payload;
    },
    coordinate: (state, action) => {
      state.mouseCoordinatesX = action.payload.clientX;
      state.mouseCoordinatesY = action.payload.clientY;
    },
    treeKey: (state, action) => {
      state.treeUnitsKey = action.payload;
    },
    unitModal: (state, action) => {
      state.unitModalFlag = action.payload;
    },
    postModal: (state, action) => {
      state.postModalFlag = action.payload;
    },
    appointmentModal: (state, action) => {
      state.appointmentModalFlag = action.payload;
    },
    toastMessage: (state, action) => {
      state.toastFlag = action.payload;
    },
  },
});
export const treeFlag = (state: any) => state.treeReducer.flag;
export const mouseCoordinatesX = (state: any) =>
  state.treeReducer.mouseCoordinatesX;
export const mouseCoordinatesY = (state: any) =>
  state.treeReducer.mouseCoordinatesY;
export const treeUnitsKey = (state: any) => state.treeReducer.treeUnitsKey;
export const _unitModalFlag = (state: any) => state.treeReducer.unitModalFlag;
export const _postModalFlag = (state: any) => state.treeReducer.postModalFlag;
export const _appointmentModalFlag = (state: any) => state.treeReducer.appointmentModalFlag;
export const _toastFlag = (state: any) => state.treeReducer.toastFlag;

export const { changeFlag, coordinate, treeKey, unitModal, postModal, appointmentModal, toastMessage } = treeSlice.actions;

export default treeSlice.reducer;
