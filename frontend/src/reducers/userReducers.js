import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, GOOGLE_USER_REGISTER_FAIL, GOOGLE_USER_REGISTER_REQUEST,GOOGLE_USER_REGISTER_SUCCESS, GOOGLE_USER_SIGNIN_FAIL, GOOGLE_USER_SIGNIN_REQUEST, GOOGLE_USER_SIGNIN_SUCCESS } from "../constants/userConstants";

function userSigninReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default: return state;
  }
}

function userGoogleSigninReducer(state = {}, action) {
  switch (action.type) {
    case GOOGLE_USER_SIGNIN_REQUEST:
      return { loading: true };
    case GOOGLE_USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case GOOGLE_USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default: return state;
  }
}

function userUpdateReducer(state = {}, action) {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function userRegisterReducer(state = {}, action) {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function userGoogleRegisterReducer(state = {}, action) {
  switch (action.type) {
    case GOOGLE_USER_REGISTER_REQUEST:
      return { loading: true };
    case GOOGLE_USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case GOOGLE_USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}
export {
  userSigninReducer, userRegisterReducer, userUpdateReducer, userGoogleRegisterReducer, userGoogleSigninReducer
}