import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/index.jsx";
import routes from "../routes.js";

const LoginForm = () => {
	const auth = useAuth();
	const [authFailed, setAuthFailed] = useState(false);
	const inputRef = useRef();
	const location = useLocation();
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: { username: "", password: "" },
		onSubmit: async (values) => {
			setAuthFailed(false);

			try {
				const res = await axios.post(routes.loginPath(), values);
				localStorage.setItem("user", JSON.stringify(res.data));
				auth.logIn();
				const { from } = location.state;
				navigate(from);
			} catch (err) {
				formik.setSubmitting(false);

				if (err.isAxiosError && err.response.status === 401) {
					setAuthFailed(true);
					inputRef.current.select();
					return;
				}
				throw err;
			}
		},
	});
	return (
		<div>
			<h1 className="row justify-content-center">Войти</h1>

			<Form onSubmit={formik.handleSubmit}>
				<Form.Control
					onChange={formik.handleChange}
					value={formik.values.username}
					required
					type="text"
					size="lg"
					name="username"
					id="username"
					placeholder="Ваш ник"
					className="mb-3"
					isInvalid={authFailed}
				/>
				<Form.Control
					onChange={formik.handleChange}
					value={formik.values.password}
					required
					type="password"
					size="lg"
					name="password"
					id="password"
					placeholder="Пароль"
					className="mb-3"
					isInvalid={authFailed}
				/>
				<Form.Control.Feedback type="invalid">
					Неверные имя пользователя или пароль
				</Form.Control.Feedback>
				<Button
					variant="outline-primary"
					className="w-100"
					type="submit"
			>
					Войти
				</Button>
			</Form>
		</div>
	);
};

export default LoginForm;
