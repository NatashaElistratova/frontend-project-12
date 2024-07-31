import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import init from './init';

const runApp = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const app = await init();

  root.render(app);
};

runApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
