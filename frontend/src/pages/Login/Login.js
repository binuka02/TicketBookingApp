import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import classes from './login.module.css';
import Input from '../../components/Input/Input';
import { useForm } from 'react-hook-form';

const Login = () => {

    const {
        register,
        formState: { errors },
      } = useForm();

	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={classes.login_container}>
			<div className={classes.login_form_container}>
				<div className={classes.left}>
					<form className={classes.form_container} >
                    <Input
            type="email"
            label="Email"
            {...register('email', {
              required: true,
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
                message: 'Email Is Not Valid',
              },
            })}
            error={errors.email}
          />

          <Input
            type="password"
            label="Password"
            {...register('password', {
              required: true,
            })}
            error={errors.password}
          />
						{error && <div className={classes.error_msg}>{error}</div>}
						<button type="submit" className={classes.green_btn}>
							Sing In
						</button>
					</form>
				</div>
				<div className={classes.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={classes.white_btn}>
							Sing Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;