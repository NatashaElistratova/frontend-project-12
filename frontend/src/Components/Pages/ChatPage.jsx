import axios from 'axios';
import io from 'socket.io-client';
import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PlusSquare } from 'react-bootstrap-icons';
import { setChannels, setMessages, selectChannel } from '../../slices/channelSlice.js';
import { openModal } from '../../slices/modalSlice.js';

import NewMessageForm from '../NewMessageForm.jsx';
import NewChannelModal from '../NewChannelModal.jsx';

import routes from '../../routes.js';

const ChatPage = () => {
  const channels = useSelector((state) => state.channels.value);
  const messages = useSelector((state) => state.channels.messages);
  const activeChannel = useSelector((state) => state.channels.activeChannel);
  const filteredMessages = messages.filter((message) => message.channelId === activeChannel.id);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const getAuthHeader = () => {
    const userdata = JSON.parse(localStorage.getItem('user'));

    if (userdata && userdata.token) {
      return { Authorization: `Bearer ${userdata.token}` };
    }

    return {};
  };

  const fetchNewMessages = async () => {
    const socket = io();

    socket.on('newMessage', (message) => {
      dispatch(setMessages([message]));
    });
  };

  const fetchMessages = async () => {
    const { data } = await axios.get(routes.messagesPath(), {
      headers: getAuthHeader(),
    });
    dispatch(setMessages(data));
    fetchNewMessages();
  };

  useEffect(() => {
    const fetchChannels = async () => {
      const { data } = await axios
        .get(routes.channelsPath(), { headers: getAuthHeader() })
        .catch((e) => {
          if (e.isAxiosError && e.response.status === 401) {
            navigate(routes.loginPagePath());
          }
        });

      dispatch(setChannels(data));
      fetchMessages();
    };

    fetchChannels();
  }, []);

  const onClickChannel = (channel) => {
    dispatch(selectChannel(channel));
  };

  const addChannel = () => {
    dispatch(openModal());
  };

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <button
              type="button"
              className="p-0 text-primary btn btn-group-vertical"
              onClick={addChannel}
            >
              <PlusSquare size={20} />
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <ul
            id="channels-box"
            className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
          >
            {channels.map((channel) => (
              <li className="nav-item w-100" key={channel.id}>
                <button
                  type="button"
                  className={`w-100 rounded-0 text-start btn ${
                    channel.id === activeChannel.id
                      ? 'btn-secondary'
                      : ''
                  }`}
                  onClick={() => onClickChannel(channel)}
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </button>
              </li>
            ))}
          </ul>
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
                  <b>{message.username}</b>
                  :
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

      <NewChannelModal />
    </div>
  );
};

export default ChatPage;
