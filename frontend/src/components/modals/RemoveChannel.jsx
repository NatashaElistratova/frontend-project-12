import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { closeModal } from '../../slices/modalSlice.js';
import { removeChannel, selectChannel } from '../../slices/channelSlice.js';
import { useDeleteChannelMutation } from '../../api/channelsApi.js';

const RemoveChannelModal = (props) => {
  const dispatch = useDispatch();
  const isOpened = useSelector((state) => state.modal.isOpened);
  const defaultChannel = useSelector((state) => state.channels.defaultChannel);
  const { t } = useTranslation();
  const { modalData } = props;

  const [deleteChannel] = useDeleteChannelMutation();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleRemove = async () => {
    try {
      const { data } = await deleteChannel(modalData.channelId);
      dispatch(removeChannel(data.id));
      dispatch(selectChannel(defaultChannel));
      dispatch(closeModal());
      toast.success(t('success.removeChannel'));
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
          role="button"
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
            role="button"
            onClick={handleClose}
          >
            {t('actions.cancel')}
          </Button>
          <Button
            variant="danger"
            type="button"
            role="button"
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
