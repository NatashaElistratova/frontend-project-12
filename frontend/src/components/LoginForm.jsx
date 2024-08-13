import React, { useRef, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';
import { logIn } from '../slices/authSlice';
import { useLoginMutation } from '../api/authApi.js';

const LoginForm = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [login] = useLoginMutation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const { data } = await login(values);
        dispatch(logIn(data));
        const navigatePath = location?.state?.from || routes.chatPagePath();
        navigate(navigatePath);
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
      <h1 className="row justify-content-center">{t('actions.login')}</h1>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.username}
          required
          type="text"
          size="lg"
          name="username"
          id="username"
          placeholder={t('placeholders.nickName')}
          className="mb-3"
          ref={inputRef}
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
          placeholder={t('placeholders.password')}
          className="mb-3"
          isInvalid={authFailed}
        />
        <Form.Control.Feedback type="invalid">
          {t('errors.usernameOrPassword')}
        </Form.Control.Feedback>
        <Button
          variant="outline-primary"
          className="w-100"
          type="submit"
        >
          {t('actions.login')}
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
