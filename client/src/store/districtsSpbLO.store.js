import { createSlice } from "@reduxjs/toolkit";
import districtsSpbLOService from "../services/districtsSpbLO.service";
import isOutDated from "../utils/isOutDate";

const districtsSpbLOSlice = createSlice({
  name: "districtsSpbLO",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    districtsSpbLORequested: (state) => {
      state.isLoading = true;
    },
    districtsSpbLOReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    districtsSpbLOFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: districtsSpbLOReducer, actions } = districtsSpbLOSlice;
const {
  districtsSpbLORequested,
  districtsSpbLOReceived,
  districtsSpbLOFailed,
} = actions;

export const loadDistrictsSpbLOList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().workingPosition;
  if (isOutDated(lastFetch)) {
    dispatch(districtsSpbLORequested());
    try {
      const { content } = await districtsSpbLOService.get();
      dispatch(districtsSpbLOReceived(content));
    } catch (error) {
      districtsSpbLOFailed(error.message);
    }
  }
};

export const getDistrictsSpbLO = () => (state) => state.districtsSpbLO.entities;

export const getgetDistrictsSpbLOStatus = () => (state) =>
  state.districtsSpbLO.isLoading;

export const getgetDistrictsSpbLOById = (id) => (state) => {
  if (state.districtsSpbLO.entities) {
    return state.districtsSpbLO.entities.find((dist) => dist._id === id);
  }
};

export default districtsSpbLOReducer;
