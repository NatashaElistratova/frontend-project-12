import React from "react";
import { Formik, useFormik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LoginForm = () => {
    const validationSchema = (values) => {
        const errors = {};
        if (!values.login) {
            errors.login = "Обязательно для заполнения";
        } else if (!values.password) {
            errors.password = "Обязательно для заполнения";
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: { login: "", password: "" },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <div>
            <h1 className="row justify-content-center">Войти</h1>
            <Formik
                initialValues={formik.initialValues}
                validationSchema={formik.validationSchema}
                onSubmit={formik.onSubmit}
            >
                <Form>
                    <Form.Control
                        required
                        type="text"
                        size="lg"
                        placeholder="Ваш ник"
                        className="mb-3"
                        defaultValue={formik.initialValues.login}
                    />
                    <Form.Control
                        required
                        type="password"
                        size="lg"
                        placeholder="Пароль"
                        className="mb-3"
                        defaultValue={formik.initialValues.password}
                    />
                    <Button
                        variant="outline-primary"
                        className="w-100"
                        type="submit"
                    >
                        Войти
                    </Button>
                </Form>
            </Formik>
        </div>
    );
};

export default LoginForm;
