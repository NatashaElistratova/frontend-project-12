import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { ArrowRightSquare } from 'react-bootstrap-icons';

const NewMessageForm = () => {
    const formik = useFormik({
        initialValues: { message: '' },
        validateOnBlur: false,
        onSubmit: () => {}
    });
    const isInvalid = !formik.dirty || !formik.isValid;

	return (
        <Form noValidate onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
            <InputGroup hasValidation={isInvalid}>
                <Form.Control
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
                name="body"
                // aria-label={t('chat.newMessage')}
                disabled={formik.isSubmitting}
                placeholder="Введите сообщение..."
                className="border-0 p-0 ps-2"
                />
                <Button variant="group-vertical" type="submit" disabled={isInvalid}>
                    <ArrowRightSquare size={20} />
                    {/* <span className="visually-hidden">{t('chat.send')}</span> */}
                </Button>
            </InputGroup>
        </Form>
    )
};

export default NewMessageForm;