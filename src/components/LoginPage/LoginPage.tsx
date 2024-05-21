import { Box, Button, Paper, TextField, Typography, styled } from '@mui/material';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { FC, useState } from 'react';
import { auth, provider } from '../../firebase-config';
import GoogleIcon from '@mui/icons-material/Google';
import LoginIcon from '@mui/icons-material/Login';


interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => {

  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event: any) => {
      event.preventDefault();
      try {
        //   await signInWithEmailAndPassword(auth, email, password);
          console.log("User logged in with email and password");
      } catch (error: any) {
          console.error("Failed to login:", error.message);
      }
  };
  



  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider).then((result: any) => {
                console.log(result)
                console.log("User logged in with Google");
            });
        } catch (error: any) {
            console.error("Failed to login with Google:", error.message);
        }
};

const CustomPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(2),
    width: '100%',
    maxWidth: '400px'
}));

return (
    <CustomPaper elevation={3}>
        <Typography variant="h5" component="h1" gutterBottom>
            Sign In
        </Typography>
        <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
        />
        <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
        />
        <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
            startIcon={<LoginIcon />}
            sx={{ mt: 2 }}
        >
            Login
        </Button>
        <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={handleGoogleLogin}
            startIcon={<GoogleIcon />}
            sx={{ mt: 2 }}
        >
            Login with Google
        </Button>
    </CustomPaper>
);

};

export default LoginPage;
