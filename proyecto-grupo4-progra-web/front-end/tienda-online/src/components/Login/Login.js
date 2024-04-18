import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Login.module.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSumbit = async () => {
    try {
      const response = await axios.post("http://localhost:3008/login", {
        usuario_Email: user,
        usuario_Password: password,
      });
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/Home");
    } catch (e) {
      alert("Invalid credentials");
    }
  };

  return(
    <div className={styles.Login} data-testid="Login">
    <form>
        <h2>Ingrese su Usuario</h2>
        <br />
        <TextField 
          id="outlined-basic" 
          onChange={(e) => {
            setUser(e.target.value);
          }}
          label="Email" 
          variant="outlined" 
          type="Email"
        />
        <br />
        <br />
        <TextField 
          id="outlined-basic" 
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          label="Password" 
          variant="outlined" 
          type="Password"
        />
        <br />
        <br />
        <Button onClick={handleSumbit} variant="contained">Ingresar</Button>
      </form>
  </div>
  );
};

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
