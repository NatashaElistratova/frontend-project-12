import axios from 'axios';
import io from 'socket.io-client';
import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/index.jsx';
import { setChannels } from '../../slices/channelSlice.js';
import { setMessages } from '../../slices/messageSlice.js';

import ChannelList from '../ChannelList.jsx';
import NewMessageForm from '../NewMessageForm.jsx';

import routes from '../../routes.js';

const ChatPage = () => {
  const auth = useAuth();
  const channels = useSelector((state) => state.channels.channels);
  const activeChannel = useSelector((state) => state.channels.activeChannel);
  const messages = useSelector((state) => state.messages.messages);
  const filteredMessages = messages.filter((message) => message.channelId === activeChannel.id);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const fetchNewMessages = async () => {
    const socket = io();

    socket.on('newMessage', (message) => {
      dispatch(setMessages([message]));
    });
  };

  const fetchMessages = async () => {
    const { data } = await axios.get(routes.messagesPath(), {
      headers: auth.getAuthHeader(),
    });
    dispatch(setMessages(data));
    fetchNewMessages();
  };

  useEffect(() => {
    const fetchChannels = async () => {
      const { data } = await axios
        .get(routes.channelsPath(), { headers: auth.getAuthHeader() })
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

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <ChannelList channels={channels} activeChannel={activeChannel} />
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
    </div>
  );
};

export default ChatPage;
