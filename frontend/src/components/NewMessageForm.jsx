import axios from 'axios';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import routes from '../routes.js';
import useAuth from '../hooks/index.jsx';

const NewMessageForm = () => {
  const auth = useAuth();
  const activeChannel = useSelector((state) => state.channels.activeChannel);
  const userdata = JSON.parse(localStorage.getItem('user'));
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [activeChannel.id]);

  const formik = useFormik({
    initialValues: { message: '' },
    validateOnBlur: false,
    onSubmit: async ({ message }) => {
      const messageData = {
        body: message,
        channelId: activeChannel.id,
        username: userdata.username,
      };

      await axios.post(
        routes.messagesPath(),
        messageData,
        { headers: auth.getAuthHeader() },
      ).then(() => {
        formik.resetForm();
        formik.setSubmitting(false);
        inputRef.current.focus();
      });
    },
  });
  const isInvalid = !formik.dirty || !formik.isValid;

  return (
    <Form
      noValidate
      onSubmit={formik.handleSubmit}
      className="py-1 border rounded-2"
    >
      <InputGroup hasValidation={isInvalid}>
        <Form.Control
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.message}
          type="text"
          name="message"
          ref={inputRef}
          required
          disabled={formik.isSubmitting}
          placeholder="Введите сообщение..."
          className="border-0 p-0 ps-2"
        />
        <Button
          variant="group-vertical"
          type="submit"
          disabled={isInvalid}
        >
          <ArrowRightSquare size={20} />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default NewMessageForm;
