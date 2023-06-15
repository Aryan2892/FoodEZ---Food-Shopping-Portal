import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register, registerGoogle } from '../actions/userActions';
import {GoogleLogin, useGoogleLogin} from '@react-oauth/google';
import {GoogleOAuthProvider} from "@react-oauth/google"

function RegisterScreen(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [isAdmin, setAdmin] = React.useState(false);
  const userRegister = useSelector(state => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();

  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, isAdmin));
  }
  function handleGoogleLoginSuccess(tokenResponse) {
    console.log(tokenResponse)

    dispatch(registerGoogle(tokenResponse))
  }
  //const login = useGoogleLogin({onSuccess: handleGoogleLoginSuccess});
  return <div className="form">
    <form >
      <ul className="form-container">
        <li>
          <h2>Create Account</h2>
        </li>
        <li>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </li>
        <li>
          <label htmlFor="isAdmin">
            Register as admin
          </label>
          <input type="checkbox" name="isAdmin" id="isAdmin" onChange={() => setAdmin(!isAdmin)}>
          </input>
          <label htmlFor="name">
            Name
          </label>
          <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="email">
            Email
          </label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="rePassword">Re-Enter Password</label>
          <input type="password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)}>
          </input>
        </li>
        <li>
          <button type="submit" onClick={submitHandler} className="button primary">Register</button>
        </li>
        <li>
        <GoogleOAuthProvider
        clientId={`944053653596-56n9u9ebbtodmmb3ubrgk4mti2fbmpcg.apps.googleusercontent.com`}>
        <GoogleLogin onSuccess={handleGoogleLoginSuccess}>
          
        </GoogleLogin>
        </GoogleOAuthProvider>
        </li>
        <li>
          Already have an account?
          <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="button secondary text-center" >LogIn to an existing accoung</Link>

        </li>

      </ul>
    </form>
  </div>
}
export default RegisterScreen;