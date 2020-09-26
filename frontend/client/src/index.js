import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { RenderAfterNavermapsLoaded } from 'react-naver-maps';

const NAVER_API_KEY = process.env.REACT_APP_NAVER_MAP_API_KEY;

ReactDOM.render(
  <React.StrictMode>
    <RenderAfterNavermapsLoaded
      ncpClientId={NAVER_API_KEY}
      error={<p>로딩을 실패하였습니다</p>}
      loading={<p>로딩중...</p>}
    >
      <App />
    </RenderAfterNavermapsLoaded>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
