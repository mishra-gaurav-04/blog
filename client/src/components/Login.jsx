import React from 'react';
import {Box,TextField,Button,Typography} from '@mui/material'
import logo from '../assets/logo.png';
import styled from '@emotion/styled';
import { useState } from 'react';
import { API } from '../service/api';
// import styled from 'styled-components';

const Component = styled(Box)`
    width : 400px;
    margin : auto;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    margin-top : 200px;
`;

const Image = styled('img')({
    width : 200,
    display : 'flex',
    margin : 'auto',
    padding : '50px 0 0',
});

const Wrapper = styled(Box)`
    padding : 25px 35px;
    display : flex;
    flex-direction : column;
    & > div , & > button {
        margin-top : 20px;
    };
    & > p {
        margin : auto;
        margin-top : 20px;placeholder="Name"
    }
`;

const signUpState = {
    name : '',
    username : '',
    password : ''
}


const Login = () => {
    const [loginState,setState] = useState('Login');
    const [signUp,setSignUp] = useState(signUpState);
    const loginHandler = () => {
        setState('login');
    }

    const accountHandler = () => {
        setState('createAccount');
    }

    const onInputHandler = (event) => {
        setSignUp({...signUp,[event.target.name]:event.target.value});
    }

    const signupUser = async() => {
        let response = await API.userSignup(signUp);
    }

  return (
   <Component>
       <Box>
       <Image src={logo} alt="" />
        {
            loginState == 'login' ? 
            <Wrapper>
            <TextField variant='standard' label='Enter Username'/>
            <TextField variant='standard' label='Enter  Password'/>
            <Button variant="contained">Login</Button>
            <Typography>OR</Typography>
            <Button onClick={accountHandler} variant="outlined">Create An Account</Button>
            </Wrapper>
            :
            <Wrapper>
            <TextField onChange={(event) => {onInputHandler(event)}} variant='standard' label='Enter Name'/>
            <TextField onChange={(event) => {onInputHandler(event)}} variant='standard' label='Enter Username'/>
            <TextField onChange={(event) => {onInputHandler(event)}} variant='standard' label='Enter  Password'/>
            <Button variant="contained" onClick={signupUser}>Create An Account</Button>
            <Typography>OR</Typography>
            <Button onClick={loginHandler} variant="outlined">Already Have An Account?</Button>
            </Wrapper>
        }   
       </Box>
   </Component>
  )
}

export default Login