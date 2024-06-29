const apiPath = '/api/v1';

const routes =  {
  loginPath: () => [apiPath, 'login'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
  chatPagePath: () => '/',
  loginPagePath: () => '/login',

};

export default routes;
