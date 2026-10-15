import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import flagsmith from '@flagsmith/flagsmith';
import { FlagsmithProvider } from '@flagsmith/flagsmith/react';
import App from './App';
import { flagsmithOptions } from './config/featureFlags';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FlagsmithProvider
      flagsmith={flagsmith}
      options={flagsmithOptions}
    >
      <App />
    </FlagsmithProvider>
  </StrictMode>,
);
