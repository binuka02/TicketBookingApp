import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
    TextField,
    InputAdornment,
    IconButton,
    Input
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import classes from './signup.module.css';
import { toast } from 'react-toastify';
import AuthService from "../../services/AuthService";
import { useAuth } from "../../hooks/useAuth";

const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
const isCNP = (cnp) => /^[0-9]{13}$/.test(cnp);

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [cnp, setCNP] = useState(""); 

    const [errors, setErrors] = useState({
        firstNameError: false,
        lastNameError: false,
        emailError: false,
        phoneError: false,
        passwordError: false,
        confirmPasswordError: false,
        cnpError: false 
    });

    const [formValid, setFormValid] = useState();
    const [success, setSuccess] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (setter) => (event) => {
        setter(event.target.value);
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handleMouseDownConfirmPassword = (event) => event.preventDefault();

    const handleEmailValidation = () => {
        if (!isEmail(email)) {
            setErrors({ ...errors, emailError: true });
        } else {
            setErrors({ ...errors, emailError: false });
        }
    };

    const handlePasswordValidation = () => {
        if (password.length < 5 || password.length > 20) {
            setErrors({ ...errors, passwordError: true });
        } else {
            setErrors({ ...errors, passwordError: false });
        }
    };

    const handleConfirmPasswordValidation = () => {
        if (password !== confirmPassword) {
            setErrors({ ...errors, confirmPasswordError: true });
        } else {
            setErrors({ ...errors, confirmPasswordError: false });
        }
    };

    const handleCNPValidation = () => {
        if (!isCNP(cnp)) {
            setErrors({ ...errors, cnpError: true });
        } else {
            setErrors({ ...errors, cnpError: false });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(null);

        if (!firstName || !lastName || !email || !contact || !password || !confirmPassword || !cnp) {
            setFormValid("All fields are required.");
            return;
        }

        if (errors.emailError || errors.passwordError || errors.confirmPasswordError || errors.cnpError) {
            setFormValid("Please correct the errors before submitting.");
            return;
        }

        setFormValid(null);

        try {
            await submit({
                firstName,
                lastName,
                email,
                contact,
                password,
                confirmPassword,
                cnp
            });
        } catch (error) {
            // Handle submission error
        }
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

    const submit = async ({ firstName, lastName, email, contact, cnp, password}) => {
        await auth.signup(firstName, lastName, email, contact, cnp, password);
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
                    <form className={classes.form_container} onSubmit={handleSubmit}>
                        <h1>Create Account</h1><br/>
                        <TextField
                            className={classes.input}
                            placeholder="First Name"
                            fullWidth
                            id="firstName"
                            variant="standard"
                            value={firstName}
                            onChange={handleChange(setFirstName)}
                            size="small"
                        /><br />
                        <TextField
                            className={classes.input}
                            placeholder="Last Name"
                            fullWidth
                            id="lastName"
                            variant="standard"
                            value={lastName}
                            onChange={handleChange(setLastName)}
                            size="small"
                        /><br />
                        <TextField
                            className={classes.input}
                            placeholder="Email Address"
                            fullWidth
                            error={errors.emailError}
                            id="email"
                            variant="standard"
                            value={email}
                            onBlur={handleEmailValidation}
                            onChange={handleChange(setEmail)}
                            size="small"
                        /><br />
                        <TextField
                            className={classes.input}
                            placeholder="Phone Number"
                            fullWidth
                            id="phone"
                            variant="standard"
                            value={contact}
                            onChange={handleChange(setPhone)}
                            size="small"
                        /><br />
                        <TextField
                            className={classes.input}
                            placeholder="CNP"
                            fullWidth
                            error={errors.cnpError}
                            id="cnp"
                            variant="standard"
                            value={cnp}
                            onBlur={handleCNPValidation}
                            onChange={handleChange(setCNP)}
                            size="small"
                        /><br />
                        <Input
                            className={classes.input}
                            error={errors.passwordError}
                            onBlur={handlePasswordValidation}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            onChange={handleChange(setPassword)}
                            value={password}
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
                            onChange={handleChange(setConfirmPassword)}
                            value={confirmPassword}
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
