import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import '../styles/shared.css';
import { getApiWrapper } from '../util/apiUtil';

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
      <h1> POND </h1>
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
