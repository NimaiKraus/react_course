import {useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useLogin } from './hooks/useLogin';
import { getAuthError, getAuthisLogged, useAuth } from "@/services/auth";

import { Error } from '@/components';

const Login = () => {
  const {dirty, formData, handleInputChange, validators} = useLogin();

  const navigate = useNavigate();

  const isThereLoginError = useAuth(getAuthError);
  const isUserLoggedIn = useAuth(getAuthisLogged);
  const login = useAuth(state => state.login);
  
  const executeLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(formData.username, formData.password);
  }

  useEffect(() => {
    if (isUserLoggedIn) navigate('/cms')
  }, [isUserLoggedIn]);

  return (
    <div className='max-w-sm mx-auto mt-20'>
      <h1 className="title">Login</h1>

      {isThereLoginError && <Error />}

      <form className="flex flex-col gap-3" onSubmit={executeLogin}>

        <label className="font-bold my-1" htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Your username..."
          value={formData.username}
          onChange={handleInputChange}           
          className={!validators.isUsernameValid && dirty ? "p-2.5 rounded-xl error" :"p-2.5 rounded-xl"}
        />

        <label className="font-bold" htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Your password..."
          value={formData.password}
          onChange={handleInputChange}
          className={!validators.isPasswordValid && dirty ? "p-2.5 rounded-xl error mb-3" :"p-2.5 rounded-xl mb-3"}
        />

        <button
          type="submit"
          className="btn primary animated-button w-fit flex items-center gap-3 self-center"
          disabled={!validators.isFormValid}
        >
          Sign in
          <FontAwesomeIcon icon={faRightToBracket} />
        </button>

      </form>
    </div>
  )
}

export default Login