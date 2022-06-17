import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SlashAuthProvider } from '@slashauth/slashauth-react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const providerOptions = {
  walletconnect: {
    infuraId: '5f33013cac72474db85f8f603c842d92',
    bridge: 'https://bridge.walletconnect.org',
  },
  coinbasewallet: {
    appName: 'Web 3 Modal Demo',
    infuraId: '5f33013cac72474db85f8f603c842d92',
  },
};

root.render(
  <SlashAuthProvider clientID="xMLb7FGCqhfXDx_v" providers={providerOptions}>
    <App />
  </SlashAuthProvider>
);