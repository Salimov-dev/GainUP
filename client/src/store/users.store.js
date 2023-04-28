import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import { generateAuthError } from "../utils/generateAuthError";

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: { userId: null },
      isLoggedIn: false,
      dataLoaded: false,
    };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    userUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = null;
      state.auth = null;
      state.dataLoaded = false;
    },
    authRequested: (state) => {
      state.error = null;
    },
    userRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (user) => user._id !== action.payload
      );
    },
  },
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  userUpdateSuccessed,
  userLoggedOut,
  userRemoved,
  userCreated,
} = actions;

const authRequested = createAction("users/authRequested");
const userUpdateRequested = createAction("users/userUpdateRequested");
const userUpdateFailed = createAction("users/userUpdateFailed");
const userRemoveRequested = createAction("users/userRemoveRequested");
const userRemoveFailed = createAction("users/userRemoveFailed");

export const logIn = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.login(payload);
    dispatch(authRequestSuccess({ userId: data.userId }));
    localStorageService.setTokens(data);
  } catch (error) {
    const { code, message } = error.response.data.error;
    if (code === 400) {
      const errorMessage = generateAuthError(message);
      dispatch(authRequestFailed(errorMessage));
    } else {
      dispatch(authRequestFailed(error.message));
    }
  }
};

export const signUp = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.register(payload);
    const { content } = await userService.get();
    const createdNewUser = content.filter((user) => user._id === data.userId);
    dispatch(userCreated(createdNewUser[0]));
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
};

export const loadUsersList = () => async (dispatch, getState) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();
    dispatch(usersReceived(content));
  } catch (error) {
    dispatch(usersRequestFailed(error.message));
  }
};

export const updateUser = (payload, userId) => async (dispatch) => {
  dispatch(userUpdateRequested());
  try {
    dispatch(userUpdateSuccessed(payload));
    await userService.update(payload, userId);
  } catch (error) {
    dispatch(userUpdateFailed(error.message));
  }
};
// export const updateUser = (payload) => async (dispatch) => {
//   dispatch(userUpdateRequested());
//   try {
//     console.log("payload updateUser", payload);
//     const { content } = await userService.update(payload);
//     console.log("content updateUser", content);
//     dispatch(userUpdateSuccessed(content));
//   } catch (error) {
//     dispatch(userUpdateFailed(error.message));
//   }
// };

export const removeUser = (userId) => async (dispatch) => {
  dispatch(userRemoveRequested());
  try {
    dispatch(userRemoved(userId));
    await userService.remove(userId);
  } catch (error) {
    dispatch(userRemoveFailed(error.message));
  }
};

export const getCurrentUserData = () => (state) => {
  return state.users.entities
    ? state.users.entities.find((u) => u._id === state.users.auth.userId)
    : null;
};

export const getUsersList = () => (state) => state.users.entities;

export const getUsersById = (id) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((user) => user._id === id);
  }
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataUsersLoadingStatus = () => (state) =>
  state.users.dataLoaded;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getCurrentUserId = () => (state) => state.users.auth?.userId;
export const getAuthErrors = () => (state) => state.users.error;

export default usersReducer;
