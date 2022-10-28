import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import '../styles/shared.css';
import { getApiWrapper } from '../util/apiUtil';
import PondLogo from '../assets/images/icons/logo.png';

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    getApiWrapper('/auth/good/', (data: any) => {
      if (data.authenticated) {
        navigate('/');
      }
    });
  }, []);

  return (
    <div className="container">
      <img className='pond-logo' src={PondLogo}></img>
      <p className='pond-text'>
        Leave this website to the side while you are on your PC! When you see or hear the alert,
        click the screen to catch the fish! Log in with your Google account to get started.
      </p>
      <a className="login-button" href="http://127.0.0.1:5000/auth/google">
        <img
          className="google-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
        />
        Login with Google
      </a>
    </div>
  );
}
