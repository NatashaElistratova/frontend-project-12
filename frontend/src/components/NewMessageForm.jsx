import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { useCreateMessageMutation } from '../api/messagesApi.js';

const NewMessageForm = () => {
  const activeChannel = useSelector((state) => state.channels.activeChannel);
  const userData = useSelector((state) => state.auth.user);
  const inputRef = useRef();
  const { t } = useTranslation();

  const [createMessage] = useCreateMessageMutation();

  const formik = useFormik({
    initialValues: { message: '' },
    validateOnBlur: false,
    onSubmit: async ({ message }) => {
      const cleanMessage = leoProfanity.clean(message);
      const messageData = {
        body: cleanMessage,
        channelId: activeChannel.id,
        username: userData.username,
      };

      await createMessage(messageData);

      formik.resetForm();
      formik.setSubmitting(false);
      // inputRef.current.focus();
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [activeChannel.id, formik.isSubmitting]);

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
