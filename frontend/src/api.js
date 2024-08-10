import axios from 'axios';
import routes from './routes.js';

export default {
  fetchData: async (url, headers) => {
    const response = await axios.get(url, { headers });

    return response;
  },
  postAuthData: async (url, payload) => {
    const response = await axios.post(url, payload);

    return response.data;
  },
  addChannel: async (payload, headers) => {
    const response = await axios.post(
      routes.channelsPath(),
      payload,
      { headers },
    );
    return response.data;
  },
  removeChannel: async (channelId, headers) => {
    const response = await axios.delete(
      `${routes.channelsPath()}/${channelId}`,
      { headers },
    );
    return response.data;
  },
  renameChannel: async (payload, headers) => {
    const response = await axios.patch(
      `${routes.channelsPath()}/${payload.id}`,
      payload,
      { headers },
    );
    return response.data;
  },
  postMessage: async (payload, headers) => {
    const response = await axios.post(
      routes.messagesPath(),
      payload,
      { headers },
    );
    return response.data;
  },
};
