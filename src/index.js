import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import AWS from 'aws-sdk'; // AWS SDK 불러오기

// AWS SDK 리전 설정
AWS.config.update({ region: 'ap-northeast-2' }); // YOUR_REGION을 실제 리전 값으로 바꿔주세요.

const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL = "https://4lzund4sl5.execute-api.ap-northeast-2.amazonaws.com/"
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
