import axios from 'axios';
import * as yup from 'yup';
import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form, InputGroup, Modal, Button,
} from 'react-bootstrap';
import useAuth from '../../hooks/index.jsx';
import routes from '../../routes.js';
import { closeModal } from '../../slices/modalSlice.js';
import { setChannels, selectChannel } from '../../slices/channelSlice.js';

import locale from '../../locales/locale.js';

const AddChannelModal = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const inputRef = useRef();

  const isOpened = useSelector((state) => state.modal.isOpened);
  const channels = useSelector((state) => state.channels.channels);
  const channelNames = channels.map((i) => i.name);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  yup.setLocale(locale);

  const getValidationSchema = (names) => yup.object().shape({
    name: yup.string()
      .min(3, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required')
      .notOneOf(names, 'Already exists!'),
  });

  const formik = useFormik({
    initialValues: { name: '' },
    validateOnBlur: false,
    validationSchema: getValidationSchema(channelNames),
    onSubmit: async ({ name, resetForm, setSubmitting }) => {
      const channelData = { name };

      try {
        const response = await axios.post(
          routes.channelsPath(),
          channelData,
          { headers: auth.getAuthHeader() },
        );

        dispatch(setChannels([response.data]));
        dispatch(selectChannel(response.data));
        dispatch(closeModal());
        setSubmitting(false);
        resetForm();
      } catch (error) {
        formik.errors = error.data;
      }
    },
  });

  const handleClose = () => {
    dispatch(closeModal());
    formik.setSubmitting(false);
    formik.resetForm();
  };

  const isInvalid = !formik.isValid;

  return (
    <Modal show={isOpened} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Добавить канал</Modal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label="Close"
          data-bs-dismiss="modal"
        />
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          onSubmit={formik.handleSubmit}
          className="py-1"
        >
          <Form.Group>
            <InputGroup hasValidation={isInvalid}>
              <Form.Control
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                type="text"
                name="name"
                ref={inputRef}
                disabled={formik.isSubmitting}
                isInvalid={isInvalid}
                className="border rounded-2 py-1 mb-2"
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            </InputGroup>
            <div className="d-flex justify-content-end">
              <Button
                className="me-2"
                variant="secondary"
                type="button"
                onClick={handleClose}
              >
                Отменить
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Отправить
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
