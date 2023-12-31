import Axios from "axios";
import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode'
import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL, USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
  GOOGLE_USER_REGISTER_FAIL, GOOGLE_USER_REGISTER_REQUEST, GOOGLE_USER_REGISTER_SUCCESS,
  GOOGLE_USER_SIGNIN_FAIL, GOOGLE_USER_SIGNIN_REQUEST, GOOGLE_USER_SIGNIN_SUCCESS
} from "../constants/userConstants";


const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
  try {
    const { data } = await Axios.put("/api/users/" + userId,
      { name, email, password }, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
  }
}

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post("/api/users/signin", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
}

const signinGoogle = (tokenResponse) => async (dispatch)=>{
  const decoded = jwtDecode(tokenResponse.credential);
  console.log(decoded);
  const email = decoded.email;
  const name = decoded.name;
  dispatch({ type: GOOGLE_USER_SIGNIN_REQUEST, payload: {name, email} });
  try{
      // login user
      const {data} = await Axios.post("/api/users/signinGoogle", {name, email});

      dispatch({type : GOOGLE_USER_SIGNIN_SUCCESS, data})
      Cookie.set('userInfo', JSON.stringify(data));
  }catch(err){
    dispatch({ type: GOOGLE_USER_SIGNIN_FAIL, payload: err.message });
  }
}

const register = (name, email, password, isAdmin) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password, isAdmin } });
  try {
    const { data } = await Axios.post("/api/users/register", { name, email, password, isAdmin });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
}

const registerGoogle = (tokenResponse) => async (dispatch)=>{
  const decoded = jwtDecode(tokenResponse.credential);
  console.log(decoded);
  const email = decoded.email;
  const name = decoded.name;
  dispatch({ type: GOOGLE_USER_REGISTER_REQUEST, payload: { name, email} });
  try{
      // signup user
      const {data} = await Axios.post("/api/users/registerGoogle", {name, email});
      dispatch({type : GOOGLE_USER_REGISTER_SUCCESS, data})
      Cookie.set('userInfo', JSON.stringify(data));
  }catch(err){
    dispatch({ type: GOOGLE_USER_REGISTER_FAIL, payload: err.message });
  }
}

const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT })
}
export { signin, register, logout, update, signinGoogle, registerGoogle };