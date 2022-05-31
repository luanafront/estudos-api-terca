import { useNavigate } from "react-router-dom";
import { TextField, Button } from '@mui/material/';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const getValueEmail = (e) => {
    let valueEmail = e.target.value 
    setEmail(valueEmail)
  }
  const getValuePassword = (e) => {
    let valuePassword = e.target.value 
    setPassword(valuePassword)
  }
  const getToken = () => {
    let data = {
      email: email,
      password: password
    }
    axios.post("https://62913677665ea71fe142a512.mockapi.io/api/v1/login/", data).then((res) => {
      let token = res.data.token 
      localStorage.setItem("token", token)
      navigate("/feed/")
    })
  }
  useEffect(() => {
    let token = localStorage.getItem("token")
    if(token !== null){
      navigate("/feed/")
    }
  },[])

  return (
    <div className="App">
      <TextField 
        id="outlined-basic" 
        label="Email" 
        variant="outlined"
        margin="normal"
        color="secondary"
        type="email"
        onChange={getValueEmail}
        value={email}
      />
       <TextField 
        id="outlined-basic" 
        label="Password" 
        variant="outlined"
        margin="normal"
        color="secondary"
        type="password"
        onChange={getValuePassword}
        value={password}
      />
      <Button 
        variant="outlined" 
        color="secondary"
        onClick={getToken}
        >
        Login
      </Button>
    </div>
  );
}

export default Login;