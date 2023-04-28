import { createAction, createSlice } from "@reduxjs/toolkit";

const hideNavBarSlice = createSlice({
  name: "isNavBarHide",
  initialState: {
    entities:  localStorage.getItem("isHideNavBar"),
  },
  reducers: {
    showNavBar: (state, action) => {
      state.entities = action.payload;
    },
    hideNavBar: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const navBarBig = createAction("navBar/showNavBar");
const navBarSmall = createAction("navBar/hideNavBar");

const { reducer: hideNavBarReducer, actions } = hideNavBarSlice;
const { showNavBar, hideNavBar } = actions;

export const toggleShowNavBar = () => (dispatch) => {
  dispatch(navBarBig);
  dispatch(showNavBar(false));
};
export const toggleHideNavBar = () => (dispatch) => {
  dispatch(navBarSmall);
  dispatch(hideNavBar(true));
};

export const getisNavBarHide = () => (state) => state.isNavBarHide.entities;

export default hideNavBarReducer;
