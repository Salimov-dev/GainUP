import { createAction, createSlice } from "@reduxjs/toolkit";

const hideAdvObjSearchBlockSlice = createSlice({
  name: "isHideAdvObjSearchBlock",
  initialState: {
    entities: localStorage.getItem("isHideAdvObjSearchBlock") || true,
  },
  reducers: {
    showAdvObjSearchBlock: (state, action) => {
      state.entities = action.payload;
    },
    hideAdvObjSearchBlock: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const AdvObjSearchBlockEnable = createAction(
  "advObjSearchBlock/showAdvObjSearchBlock"
);
const AdvObjSearchBlockDisable = createAction(
  "advObjSearchBlock/hideAdvObjSearchBlock"
);

const { reducer: hideAdvObjSearchBlockReducer, actions } =
  hideAdvObjSearchBlockSlice;
const { showAdvObjSearchBlock, hideAdvObjSearchBlock } = actions;

export const toggleShowAdvObjSearchBlock = () => (dispatch) => {
  dispatch(AdvObjSearchBlockEnable);
  dispatch(showAdvObjSearchBlock(true));
};

export const toggleHideAdvObjSearchBlock = () => (dispatch) => {
  dispatch(AdvObjSearchBlockDisable);
  dispatch(hideAdvObjSearchBlock(false));
};

export const getIsHideAdvObjSearchBlock = () => (state) =>
  state.isHideAdvObjSearchBlock.entities;

export default hideAdvObjSearchBlockReducer;
