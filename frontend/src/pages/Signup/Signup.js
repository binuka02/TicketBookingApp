import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
    TextField,
    InputAdornment,
    IconButton,
    Input,
    InputLabel
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import classes from './signup.module.css';
import { toast } from 'react-toastify';
import AuthService from "../../services/AuthService";
import { useAuth } from "../../hooks/useAuth";


const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({
        firstNameError: false,
        lastNameError: false,
        emailError: false,
        phoneError: false,
        passwordError: false,
        confirmPasswordError: false
    });

    const [formValid, setFormValid] = useState();
    const [success, setSuccess] = useState();

    const handleChange = ({ target: { name, value } }) => {
        setData({ ...data, [name]: value });
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handleMouseDownConfirmPassword = (event) => event.preventDefault();

    const handleEmailValidation = () => {
        if (!isEmail(data.email)) {
            setErrors({ ...errors, emailError: true });
            return;
        }
        setErrors({ ...errors, emailError: false });
    };

    const handlePasswordValidation = () => {
        if (data.password.length < 5 || data.password.length > 20) {
            setErrors({ ...errors, passwordError: true });
            return;
        }
        setErrors({ ...errors, passwordError: false });
    };

    const handleConfirmPasswordValidation = () => {
        if (data.password !== data.confirmPassword) {
            setErrors({ ...errors, confirmPasswordError: true });
            return;
        }
        setErrors({ ...errors, confirmPasswordError: false });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(null);

        if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.password || !data.confirmPassword) {
            setFormValid("All fields are required.");
            return;
        }

        if (errors.emailError || errors.passwordError || errors.confirmPasswordError) {
            setFormValid("Please correct the errors before submitting.");
            return;
        }

        setFormValid(null);

       
    };

    const auth = useAuth();
    const { user } = auth;
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const returnUrl = params.get('returnUrl');
  
    useEffect(() => {
      if (!user) return;
      returnUrl ? navigate(returnUrl) : navigate('/');
    }, [user]);


    const submit = async data => {
        await auth.signup(data);
      };

    return (
        <div className={classes.signup_container}>
            <div className={classes.signup_form_container}>
                <div className={classes.left}>
                    <h1>Welcome Back</h1>
                    <Link to="/login">
                        <button type="button" className={classes.white_btn}>
                            Sign In
                        </button>
                    </Link>
                </div>
                <div className={classes.right}>
                    <form className={classes.form_container} onSubmit={(e) => handleSubmit(e, submit)}>
                        <h1>Create Account</h1><br/>
                        <TextField
                            className={classes.input}
                            placeholder="First Name"
                            fullWidth
                            id="firstName"
                            variant="standard"
                            value={data.firstName}
                            name="firstName"
                            onChange={handleChange}
                            size="small"
                        /><br />
                        <TextField
                            className={classes.input}
                            placeholder="Last Name"
                            fullWidth
                            id="lastName"
                            variant="standard"
                            value={data.lastName}
                            name="lastName"
                            onChange={handleChange}
                            size="small"
                        /><br />
                        <TextField
                            className={classes.input}
                            placeholder="Email Address"
                            fullWidth
                            error={errors.emailError}
                            id="email"
                            variant="standard"
                            value={data.email}
                            name="email"
                            onBlur={handleEmailValidation}
                            onChange={handleChange}
                            size="small"
                        /><br />
                        <TextField
                            className={classes.input}
                            placeholder="Phone Number"
                            fullWidth
                            id="phone"
                            variant="standard"
                            value={data.phone}
                            name="phone"
                            onChange={handleChange}
                            size="small"
                        /><br />
                        <Input
                            className={classes.input}
                            error={errors.passwordError}
                            onBlur={handlePasswordValidation}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
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
                        <Input
                            className={classes.input}
                            error={errors.confirmPasswordError}
                            onBlur={handleConfirmPasswordValidation}
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            onChange={handleChange}
                            value={data.confirmPassword}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle confirm password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownConfirmPassword}
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        /><br />
                        {formValid && <div className={classes.error_msg}>{formValid}</div>}
                        {success && <div className={classes.success_msg}>{success}</div>}
                        <button type="submit" className={classes.green_btn}>
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
