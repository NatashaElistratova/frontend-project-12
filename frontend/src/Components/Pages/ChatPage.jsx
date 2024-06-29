import axios from "axios";
import io from "socket.io-client";
import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    setChannels,
    selectChannel,
    setMessages,
} from "../../slices/channelSlice.js";

import NewMessageForm from "../NewMessageForm.jsx";

import routes from "../../routes.js";

function ChatPage() {
    const channels = useSelector((state) => state.channels.value);
    const messages = useSelector((state) => state.channels.messages);
    const activeChatId = useSelector((state) => state.channels.activeChatId);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const getAuthHeader = () => {
        const userdata = JSON.parse(localStorage.getItem("user"));

        if (userdata && userdata.token) {
            return { Authorization: `Bearer ${userdata.token}` };
        }

        return {};
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

    const fetchMessages = async () => {
        const { data } = await axios.get(routes.messagesPath(), {
            headers: getAuthHeader(),
        });
        dispatch(setMessages(data));
        fetchNewMessages();
    };

    const fetchNewMessages = async () => {
        const socket = io();

        socket.on("newMessage", (message) => {
          dispatch(setMessages([message]));
        });
    };

    const onClickChannel = (channelId) => {
        dispatch(selectChannel(channelId));
        fetchMessages();
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
                        >
                            <span className="visually-hidden">+</span>
                        </button>
                    </div>
                    <ul
                        id="channels-box"
                        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
                    >
                        {channels.map((channel) => {
                            return (
                                <li className="nav-item w-100" key={channel.id}>
                                    <button
                                        type="button"
                                        className={`w-100 rounded-0 text-start btn ${
                                            channel.id === String(activeChatId)
                                                ? "btn-secondary"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            onClickChannel(channel.id)
                                        }
                                    >
                                        <span className="me-1">#</span>
                                        {channel.name}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="col p-0 h-100">
                    <div className="d-flex flex-column h-100">
                        <div className="bg-light mb-4 p-3 shadow-sm small">
                            <p className="m-0">
                                <b># general</b>
                            </p>
                            <span className="text-muted">
                                {messages.length} сообщений
                            </span>
                        </div>
                        <div
                            id="messages-box"
                            className="chat-messages overflow-auto px-5"
                        >
                            {messages.map((message) => {
                                return (
                                    <div key={message.id} className="text-break mb-2">
                                        <b>{message.username}</b>: {message.body}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-auto px-5 py-3">
                            <NewMessageForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
