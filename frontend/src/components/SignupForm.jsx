import axios from 'axios';
import * as yup from 'yup';
import { useRef, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';
import locale from '../locales/locale.js';

const SignupForm = () => {
  const auth = useAuth();
  const [signupFailed, setSignupFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  yup.setLocale(locale);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    username: yup.string()
      .min(3, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required'),
    password: yup.string()
      .min(6, 'Too Short!')
      .required('Required'),
    confirmPassword: yup.string()
      .min(6, 'Too Short!')
      .required('Required')
      .oneOf([yup.ref('password')], 'Your passwords do not match.'),
  });

  const formik = useFormik({
    initialValues: { username: '', password: '', confirmPassword: '' },
    validationSchema,

    onSubmit: async (values) => {
      setSignupFailed(false);

      try {
        const res = await axios.post(routes.signupPath(), values);
        localStorage.setItem('user', JSON.stringify(res.data));
        auth.logIn();
        const navigatePath = routes.chatPagePath();
        navigate(navigatePath);
      } catch (err) {
        formik.setSubmitting(false);
        setSignupFailed(true);

        if (err.isAxiosError && err.response.status === 409) {
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div>
      <h1 className="row justify-content-center">Регистрация</h1>

      <Form onSubmit={formik.handleSubmit} noValidate>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.username}
            type="text"
            name="username"
            id="username"
            ref={inputRef}
            isInvalid={formik.errors.username || signupFailed}
          />
          <Form.Label htmlFor="username">Имя пользователя</Form.Label>
          <Form.Control.Feedback type="invalid" tooltip>
            {signupFailed ? 'Пользователь с таким логином уже существует' : formik.errors.username }
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="form-floating mb-3">
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.password}
            type="password"
            name="password"
            id="password"
            isInvalid={formik.errors.password || signupFailed}
          />
          <Form.Label htmlFor="username">Пароль</Form.Label>
          <Form.Control.Feedback type="invalid" tooltip placement="right">
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="form-floating mb-3">
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            isInvalid={formik.errors.confirmPassword || signupFailed}
          />
          <Form.Label htmlFor="username">Подтвердите пароль</Form.Label>
          <Form.Control.Feedback type="invalid" tooltip placement="right">
            {formik.errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          variant="outline-primary"
          className="w-100"
          type="submit"
        >
          Зарегистрироваться
        </Button>
      </Form>
    </div>
  );
};

export default SignupForm;
