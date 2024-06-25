const apiPath = '/api/v1';

const routes =  {
  loginPath: () => [apiPath, 'login'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  chatPagePath: () => '/',
  loginPagePath: () => '/login',

};

export default routes;
