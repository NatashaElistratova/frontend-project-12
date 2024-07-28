import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import App from './App';
import reportWebVitals from './reportWebVitals';

import store from './slices/index.js';

import resources from './locales/index.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

const init = async () => {
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance
    .use(initReactI18next)
    .init({
      lng: 'ru',
      debug: true,
      resources,
    });

  root.render(
    <Provider store={store}>
      <I18nextProvider i18n={i18nextInstance}>
        <App />
      </I18nextProvider>
    </Provider>,
  );
};

init();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
