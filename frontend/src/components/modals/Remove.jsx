import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

import { closeModal } from '../../slices/modalSlice.js';

const DeleteChannelModal = () => {
  const dispatch = useDispatch();
  const isOpened = useSelector((state) => state.modal.isOpened);

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Modal show={isOpened} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Удалить канал</Modal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label="Close"
          data-bs-dismiss="modal"
        />
      </Modal.Header>
      <Modal.Body>

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
            variant="danger"
            type="submit"
          >
            Удалить
          </Button>
        </div>

      </Modal.Body>
    </Modal>
  );
};

export default DeleteChannelModal;
