import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import localStorageService, {
  setTokens,
} from "../services/localStorage.service";
import Loader from "../components/UI/loader/Loader";

export const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
});
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const key = "AIzaSyBvO4dVAU_QjSrQ2rTa4qXFZAB07ZecMX4";

  async function logIn({ email, password }) {
    try {
      const { data } = await httpAuth.post(
        `accounts:signInWithPassword?key=${key}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      );
      setTokens(data);
      getUserData();
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        switch (message) {
          case "INVALID_PASSWORD":
            throw new Error("Email или пароль введены неправильно");
          default:
            throw new Error("Слишком много попыток входа, попробуйте позже");
        }
      }
    }
  }

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser();
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }

  function logOut() {
    localStorageService.removeAuthData();
    setUser(null);
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  return (
    <AuthContext.Provider
      value={{ logIn, logOut, currentUser }}
      // value={{ signUp, logIn, createUser, logOut, currentUser }}
    >
      {!isLoading ? children : <Loader />}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
