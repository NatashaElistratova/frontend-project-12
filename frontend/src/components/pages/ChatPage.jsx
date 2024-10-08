import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import socket from '../../socket.js';
import { setChannels, removeChannel, renameChannel } from '../../slices/channelSlice.js';
import { setMessages } from '../../slices/messageSlice.js';
import ChannelList from '../ChannelList.jsx';
import NewMessageForm from '../NewMessageForm.jsx';
import { useGetChannelsQuery } from '../../api/channelsApi.js';
import { useGetMessagesQuery } from '../../api/messagesApi.js';
import routes from '../../routes.js';

const ChatPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const channels = useSelector((state) => state.channels.channels);
  const activeChannel = useSelector((state) => state.channels.activeChannel);
  const messages = useSelector((state) => state.messages.messages);
  const filteredMessages = messages.filter((message) => message.channelId === activeChannel.id);

  const onNewChannel = (channel) => {
    dispatch(setChannels([channel]));
  };
  const onRemoveChannel = ({ id }) => {
    dispatch(removeChannel(id));
  };
  const onRenameChannel = (channel) => {
    dispatch(renameChannel(channel));
  };
  const onNewMessage = (message) => {
    dispatch(setMessages([message]));
  };

  const { data: channelsData, error: getChannelsError } = useGetChannelsQuery(undefined);
  useEffect(() => {
    if (channelsData?.length) {
      dispatch(setChannels(channelsData));
      return;
    }

    if (getChannelsError) {
      switch (getChannelsError.response.status) {
        case 401:
          navigate(routes.loginPagePath());
          break;
        case 500:
          toast.error(t('errors.networkError'));
          break;
        default:
          toast.error(t('errors.fetchChannels'));
          break;
      }
    }

    socket.on('newChannel', onNewChannel);
    socket.on('removeChannel', onRemoveChannel);
    socket.on('renameChannel', onRenameChannel);
  }, [channelsData, getChannelsError, dispatch, navigate]);

  const { data: messagesData, error: getMessagesError } = useGetMessagesQuery(undefined);
  useEffect(() => {
    if (messagesData?.length) {
      dispatch(setMessages(messagesData));
      return;
    }

    if (getMessagesError) {
      toast.error(t('errors.fetchMessages'));
    }

    socket.on('newMessage', onNewMessage);
  }, [messagesData, getMessagesError]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          {channels?.length
            ? (<ChannelList channels={channels} activeChannel={activeChannel} />)
            : null}
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>
                  #
                  {activeChannel.name}
                </b>
              </p>
              <span className="text-muted">
                {filteredMessages.length}
                {' '}
                сообщений
              </span>
            </div>
            <div
              id="messages-box"
              className="chat-messages overflow-auto px-5"
            >
              {filteredMessages.map((message) => (
                <div key={message.id} className="text-break mb-2">
                  <b>
                    {message.username}
                  </b>
                  :
                  {' '}
                  {message.body}
                </div>
              ))}
            </div>
            <div className="mt-auto px-5 py-3">
              <NewMessageForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
