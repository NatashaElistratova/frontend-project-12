import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import leoProfanity from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import resources from './locales/index.js';
import store from './slices/index.js';
import App from './App';
import forbiddenWords from './locales/forbiddenWords.js';

import 'react-toastify/dist/ReactToastify.css';

const init = async () => {
  const toastDelay = 5000;

  leoProfanity.loadDictionary('ru');
  leoProfanity.add(forbiddenWords);

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    enabled: process.env.NODE_ENV === 'production',
    environment: 'prod',
  };

  const i18nextInstance = i18next.createInstance();
  await i18nextInstance
    .use(initReactI18next)
    .init({
      lng: 'ru',
      debug: true,
      resources,
    });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18nextInstance}>
            <ToastContainer
              autoClose={toastDelay}
              hideProgressBar={false}
              newestOnTop={false}
              pauseOnHover
            />
            <App />
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
