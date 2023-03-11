import { Container, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import '../styles/shared.css';
import { getApiWrapper } from '../util/apiUtil';

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Pond';
    getApiWrapper('/auth/good/', (data: any) => {
      if (data.authenticated) {
        navigate('/');
      }
    });
  }, []);

  return (
    <Container>
      <Paper>
      <Stack spacing={3} padding={10} justifyContent='center' alignItems='center'>
        <Typography variant='h2'>Pond</Typography>
        <Typography variant='subtitle1'>Welcome to Pond! Login with Google to get started</Typography>
        <a className="login-button" href={`${process.env.REACT_APP_POND_API_URL}/auth/google`}>
            <img
              className="google-logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            />
            Login with Google
          </a>
      </Stack>
      </Paper>


    </Container>
  );
}
