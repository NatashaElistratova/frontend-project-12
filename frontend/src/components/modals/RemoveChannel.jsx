import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/index.jsx';

import { closeModal } from '../../slices/modalSlice.js';
import { removeChannel, selectChannel } from '../../slices/channelSlice.js';

import routes from '../../routes.js';

const RemoveChannelModal = (props) => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const isOpened = useSelector((state) => state.modal.isOpened);
  const defaultChannel = useSelector((state) => state.channels.defaultChannel);
  const { t } = useTranslation();
  const { data } = props;
  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleRemove = async () => {
    try {
      const response = await axios.delete(
        `${routes.channelsPath()}/${data.channelId}`,
        { headers: auth.getAuthHeader() },
      );
      dispatch(removeChannel(response.data.id));
      dispatch(selectChannel(defaultChannel));
      dispatch(closeModal());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={isOpened} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>
          {t('titles.deleteChannel')}
        </Modal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label="Close"
          data-bs-dismiss="modal"
        />
      </Modal.Header>
      <Modal.Body>
        {t('titles.areYouSure')}
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
            variant="danger"
            type="button"
            onClick={handleRemove}
          >
            {t('actions.delete')}
          </Button>
        </div>

      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
