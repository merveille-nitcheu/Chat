import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';


export default function Login() {

  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('');


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('userName', userName);
    navigate('/chat');
  };
  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Login to your account
      </Typography>
      <form onSubmit={handleSubmit}>

        <Box>
          <TextField
            margin="normal"
            required
            fullWidth
            id="userName"
            label="userName"
            name="userName"
            autoFocus
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />


          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            LogIn
          </Button>

        </Box>

      </form>
    </Box>
  );
}
