import { createSlice } from "@reduxjs/toolkit";
import statusService from "../services/status.service";
import isOutDated from "../utils/isOutDate";

const statusObjectSlice = createSlice({
  name: "statusObject",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    statusObjectRequested: (state) => {
      state.isLoading = true;
    },
    statusObjectReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    statusObjectFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: statusObjectReducer, actions } = statusObjectSlice;
const { statusObjectRequested, statusObjectReceived, statusObjectFailed } =
  actions;

export const loadStatusObjectList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().workingPosition;
  if (isOutDated(lastFetch)) {
    dispatch(statusObjectRequested());
    try {
      const { content } = await statusService.get();
      dispatch(statusObjectReceived(content));
    } catch (error) {
      statusObjectFailed(error.message);
    }
  }
};

export const getStatusObject = () => (state) => state.statusObject.entities;

export const getStatusObjectStatus = () => (state) =>
  state.statusObject.isLoading;

export const getStatusObjectById = (id) => (state) => {
  if (state.statusObject.entities) {
    const obj = state.statusObject.entities.filter(status => status?._id === id)
    return obj[0].name
  }
};

export default statusObjectReducer;
