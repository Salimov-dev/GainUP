import { createSlice } from "@reduxjs/toolkit";
import userAccessRootService from "../services/userAccessRoot.service";
import isOutDated from "../utils/isOutDate";

const userAccessRootSlice = createSlice({
  name: "userAccessRoot",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    userAccessRootRequested: (state) => {
      state.isLoading = true;
    },
    userAccessRootReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    userAccessRootFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: userAccessRootReducer, actions } = userAccessRootSlice;
const {
  userAccessRootRequested,
  userAccessRootReceived,
  userAccessRootFailed,
} = actions;

export const loadUserAccessRootList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().userAccessRoot;
  if (isOutDated(lastFetch)) {
    dispatch(userAccessRootRequested());
    try {
      const { content } = await userAccessRootService.get();
      dispatch(userAccessRootReceived(content));
    } catch (error) {
      userAccessRootFailed(error.message);
    }
  }
};

export const getUserAccessRootById = (id) => (state) => {
  if (state.userAccessRoot.entities) {
    return state.userAccessRoot.entities.find((root) => root._id === id);
  }
};

export const getUserAccessRoot = () => (state) => state.userAccessRoot.entities;

export const getUserAccessRootStatus = () => (state) =>
  state.userAccessRoot.isLoading;

export default userAccessRootReducer;
