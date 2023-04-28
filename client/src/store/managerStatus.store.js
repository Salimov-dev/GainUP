import { createSlice } from "@reduxjs/toolkit";
import managersStatusService from "../services/managersStatus.service";
import isOutDated from "../utils/isOutDate";

const managersStatusSlice = createSlice({
  name: "managersStatus",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    managersStatusRequested: (state) => {
      state.isLoading = true;
    },
    managersStatusReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    managersStatusFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: managersStatusReducer, actions } = managersStatusSlice;
const {
  managersStatusRequested,
  managersStatusReceived,
  managersStatusFailed,
} = actions;

export const loadManagersStatusList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().workingPosition;
  if (isOutDated(lastFetch)) {
    dispatch(managersStatusRequested());
    try {
      const { content } = await managersStatusService.get();
      dispatch(managersStatusReceived(content));
    } catch (error) {
      managersStatusFailed(error.message);
    }
  }
};

export const getManagersStatus = () => (state) => state.managersStatus.entities;

export const getManagersStatusLoadingStatus = () => (state) =>
  state.managersStatus.isLoading;

export const getManagersStatusById = (id) => (state) => {
  if (state.managersStatus.entities) {
    return state.managersStatus.entities.find((s) => s._id === id);
  }
};

export default managersStatusReducer;
