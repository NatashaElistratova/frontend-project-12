import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import useAuth from '../hooks/index.jsx';
import api from '../api.js';

const NewMessageForm = () => {
  const auth = useAuth();
  const activeChannel = useSelector((state) => state.channels.activeChannel);
  const userdata = JSON.parse(localStorage.getItem('user'));
  const inputRef = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, [activeChannel.id]);

  const formik = useFormik({
    initialValues: { message: '' },
    validateOnBlur: false,
    onSubmit: async ({ message }) => {
      const cleanMessage = leoProfanity.clean(message);
      const messageData = {
        body: cleanMessage,
        channelId: activeChannel.id,
        username: userdata.username,
      };

      await api.postMessage(
        messageData,
        auth.getAuthHeader(),
      );

      formik.resetForm();
      formik.setSubmitting(false);
      inputRef.current.focus();
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
          placeholder={t('placeholders.typeMessage')}
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
