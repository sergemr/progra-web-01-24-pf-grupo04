import React from 'react';
import PropTypes from 'prop-types';
import styles from './Usuario.module.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Usuario = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmacion, setPasswordConfirmacion] = useState("");
  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3008/register", {
        usuario_Nombre: nombre,
        usuario_Apellido: apellido,
        usuario_Email: email,
        usuario_Telefono: telefono,
      });
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/Home");
      setNombre("");
      setApellido("");
      setEmail("");
      setTelefono("");
      setPassword("");
      setPasswordConfirmacion("");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return(
    <div className={styles.Usuario} data-testid="Usuario">
      <form>
        <h2>Ingrese sus datos</h2>
        <br />
        <TextField 
          id="outlined-basic" 
          onChange={(e) => {
            setNombre(e.target.value);
          }}
          label="Nombre" 
          variant="outlined" 
        />
        <br />
        <br />
        <TextField 
          id="outlined-basic" 
          onChange={(e) => {
            setApellido(e.target.value);
          }}
          label="Apellido" 
          variant="outlined" 
        />
        <br />
        <br />
        <TextField 
          id="outlined-basic" 
          onChange={(e) => {
            setEmail(e.target.value);
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
            setTelefono(e.target.value);
          }}
          label="Telefono" 
          variant="outlined" 
        />
        <br />
        <br />
        <TextField 
          id="outlined-basic" 
          label="Password" 
          variant="outlined" 
          type="Password"
          autoComplete="current-password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <br />
        <br />
        <TextField 
          id="outlined-basic" 
          label="Password Confirmacion" 
          type="Password"
          variant="outlined" 
          onChange={(e) => {
            setPasswordConfirmacion(e.target.value)
          }}
        />
        <br />
        {password === passwordConfirmacion ?(
          <h2></h2>
          ):(
          <h4>Debe confirmar su Password</h4>
          )
          }
        <br />
        <Button onClick={handleSumbit} variant="contained">Registrar</Button>
      </form>
    </div>
  )
};

Usuario.propTypes = {};

Usuario.defaultProps = {};

export default Usuario;
