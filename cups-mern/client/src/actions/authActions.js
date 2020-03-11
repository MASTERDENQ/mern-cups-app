import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";

// Check token & load user.
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  // Make GET Request
  axios.get("/api/auth/user", tokenConfig(getState)).then(res =>
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  );
  // .catch(err => {
  //   dispatch(returnErrors(err.response.data, err.response.status));
  //   dispatch({ type: AUTH_ERROR });
  // });
};

// Register User
export const register = ({ name, email, password }) => dispatch => {
  // Header a.k.a config info
  const config = {
    header: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ name, email, password });

  // Making Request
  axios
    .post("api/users", body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

/************ HELPER FUNCTION FOR WEB TOKEN API (TOKEN CONFIGURATION) ***************** */
// Only use if token is required by application

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from localStorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type:": "application/json"
    }
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
