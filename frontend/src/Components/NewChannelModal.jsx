import axios from 'axios';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form, InputGroup, Modal, Button,
} from 'react-bootstrap';
import routes from '../routes.js';
import { closeModal } from '../slices/modalSlice.js';

const NewChannelModal = () => {
  const dispatch = useDispatch();
  const isOpened = useSelector((state) => state.modal.isOpened);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const userdata = JSON.parse(localStorage.getItem('user'));

  const formik = useFormik({
    initialValues: { name: '' },
    validateOnBlur: false,
    onSubmit: async ({ name }) => {
      const getAuthHeader = () => {
        if (userdata && userdata.token) {
          return { Authorization: `Bearer ${userdata.token}` };
        }

        return {};
      };

      const channelData = { name };

      await axios.post(
        routes.channelsPath(),
        channelData,
        { headers: getAuthHeader() },
      ).then(() => {
        formik.setSubmitting(false);
        handleClose();
      });
    },
  });
  const isInvalid = !formik.dirty || !formik.isValid;

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
                value={formik.values.message}
                type="text"
                name="name"
                required
                disabled={formik.isSubmitting}
                className="border rounded-2 py-1 mb-2"
              />
              <Form.Control.Feedback type="invalid" />
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

export default NewChannelModal;
