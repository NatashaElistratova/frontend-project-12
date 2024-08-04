import * as yup from 'yup';
import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form, InputGroup, Modal, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { closeModal } from '../../slices/modalSlice.js';
import { updateChannel } from '../../slices/channelSlice.js';
import useAuth from '../../hooks/index.jsx';
import api from '../../api.js';

const RenameChannelModal = (props) => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const isOpened = useSelector((state) => state.modal.isOpened);
  const channels = useSelector((state) => state.channels.channels);
  const inputRef = useRef();
  const { t } = useTranslation();

  const { data } = props;

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  const channelNames = channels.filter((i) => i.id !== data.id).map((i) => i.name);

  const getValidationSchema = (names) => yup.object().shape({
    name: yup.string()
      .min(3, t('errors.validation.min3'))
      .max(20, t('errors.validation.max20'))
      .required(t('errors.validation.required'))
      .notOneOf(names, t('errors.validation.channelExists')),
  });

  const formik = useFormik({
    initialValues: { name: data.name },
    validateOnBlur: false,
    validationSchema: getValidationSchema(channelNames),
    onSubmit: async ({ name, resetForm, setSubmitting }) => {
      const payload = { ...data, name };
      try {
        const response = await api.renameChannel(
          payload,
          auth.getAuthHeader(),
        );
        dispatch(updateChannel(response));
        dispatch(closeModal());
        toast.success(t('success.renameChannel'));
        setSubmitting(false);
        resetForm();
      } catch (error) {
        console.error(error);
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
        <Modal.Title>{t('titles.renameChannel')}</Modal.Title>
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
                {t('actions.cancel')}
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {t('actions.send')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
