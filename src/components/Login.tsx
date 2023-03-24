import { Box, Container, Link, Paper, Stack, Typography } from '@mui/material';
import { textAlign } from '@mui/system';
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
      <Stack spacing={5} justifyContent='center' alignItems='center'>
        <Box component='img' sx={{ width: 700 }}src={require('../assets/images/pond-logo.png')}/>
          
          <h2>
            Leave Pond open while you are studying, working, gaming, or just relaxing! Click your screen when you see and hear the cue and collect all kinds of fish!
          </h2>
            
      
        
        <a className="login-button" href={`${process.env.REACT_APP_POND_API_URL}/auth/google`}>
              <img
                className="google-logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              />
              Continue with Google
        </a>

      </Stack>
    </Container>
  );
}
