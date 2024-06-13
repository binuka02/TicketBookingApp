import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { TextField, InputAdornment, IconButton, Input, InputLabel } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import classes from './login.module.css';
import { toast } from 'react-toastify';
import { useAuth } from "../../hooks/useAuth";

const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [formValid, setFormValid] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  
  const handleEmail = () => {
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
  };

  const handlePassword = () => {
    if (!passwordInput || passwordInput.length < 5 || passwordInput.length > 20) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
  };

  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [params] = useSearchParams();
  const returnUrl = params.get('returnUrl');
  
  useEffect(() => {
    if (!user) return;

    returnUrl ? navigate(returnUrl) : navigate('/');
  }, [user, navigate, returnUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);

    handleEmail();
    handlePassword();

    if (emailError || !emailInput) {
      setFormValid("Email is Invalid. Please Re-Enter");
      return;
    }

    if (passwordError || !passwordInput) {
      setFormValid("Password must be between 5 - 20 characters long. Please Re-Enter");
      return;
    }
    
    setFormValid(null);

    try {
      await login(emailInput, passwordInput);
    } catch (error) {
    }
  };

  return (
    <div className={classes.login_container}>
      <div className={classes.login_form_container}>
        <div className={classes.left}>
          <form className={classes.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1><br />
            <InputLabel error={emailError} className={classes.loginInputLabel}>Email Address</InputLabel><br />
            <TextField
              className={classes.input}
              placeholder="Email Address"
              fullWidth
              error={emailError}
              variant="standard"
              value={emailInput}
              size="small"
              onBlur={handleEmail}
              onChange={(event) => setEmailInput(event.target.value)}
            /><br />
            <InputLabel error={passwordError} className={classes.loginInputLabel}>Password</InputLabel>
            <Input
              className={classes.input}
              error={passwordError}
              onBlur={handlePassword}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(event) => setPasswordInput(event.target.value)}
              value={passwordInput}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            /><br />
            <button type="submit" className={classes.green_btn}>Sign In</button>
            {formValid && <div className={classes.error_msg}>{formValid}</div>}
            {success && <div className={classes.success_msg}>{success}</div>}
          </form>
        </div>
        <div className={classes.right}>
          <h1>New Here?</h1>
          <Link to="/signup">
            <button type="button" className={classes.white_btn}>Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
