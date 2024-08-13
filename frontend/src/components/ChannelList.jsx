import React, { useState } from 'react';
import { PlusSquare } from 'react-bootstrap-icons';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';

import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { openModal } from '../slices/modalSlice.js';
import { selectChannel } from '../slices/channelSlice.js';

import getModal from './modals/index.js';

const ChannelList = ({ channels, activeChannel }) => {
  const [modalData, setModalData] = useState({ type: null, data: null });
  const showModal = (type, data) => setModalData({ type, data });
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const renderModal = ({ type, data }) => {
    if (!type) {
      return null;
    }

    const Component = getModal({ type, data });
    return <Component modalData={data} />;
  };

  const handleAddChannel = () => {
    showModal('adding');
    dispatch(openModal());
  };

  const handleRemoveChannel = (channelId) => {
    showModal('removing', { channelId });
    dispatch(openModal());
  };

  const handleRenameChannel = (channel) => {
    showModal('renaming', channel);
    dispatch(openModal());
  };

  const handleChooseChannel = (channel) => {
    dispatch(selectChannel(channel));
  };

  return (
    <div>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('titles.channels')}</b>
        <Button
          type="button"
          variant="group-vertical"
          className="p-0 text-primary"
          onClick={handleAddChannel}
        >
          <PlusSquare size={20} />
        </Button>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => (
          <li className="nav-item w-100" key={channel.id}>
            {channel.removable
              ? (
                <Dropdown as={ButtonGroup} className="d-flex">
                  <Button
                    type="button"
                    key={channel.id}
                    className="w-100 rounded-0 text-start text-truncate"
                    variant={channel.id === activeChannel.id ? 'secondary' : 'light'}
                    onClick={() => handleChooseChannel(channel)}
                  >
                    <span className="me-1">#</span>
                    {channel.name}
                  </Button>
                  <Dropdown.Toggle
                    split
                    className="flex-grow-0"
                    variant={channel.id === activeChannel.id ? 'secondary' : 'light'}
                  >
                    <span className="visually-hidden" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleRemoveChannel(channel.id)}>
                      {t('actions.delete')}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleRenameChannel(channel)}>
                      {t('actions.rename')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )
              : (
                <Button
                  type="button"
                  className="w-100 rounded-0 text-start btn"
                  variant={channel.id === activeChannel.id ? 'secondary' : 'light'}
                  onClick={() => handleChooseChannel(channel)}
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </Button>
              )}
          </li>
        ))}
      </ul>

      {renderModal(modalData)}
    </div>
  );
};

export default ChannelList;
