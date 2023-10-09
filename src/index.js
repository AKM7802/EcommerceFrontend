import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import ScrollToTop from './effects/ScrollToTop';
import './index.css'
import { CartProvider } from './context/cartContext';
import { ProductProvider } from './context/productContext';
import { DesignProvider } from './context/designContext';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
const url="http://localhost:8080/"
root.render(
  <Auth0Provider
    domain="dev-4q6drfg7r72mau38.uk.auth0.com"
    clientId="vzgyBamRn16wipflfYwV1j1DgqjC0C9H"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
  <React.StrictMode>
    <ProductProvider url={url}>
      <DesignProvider url={url}>
        <CartProvider url={url}>
          <BrowserRouter>
            <ScrollToTop/>
            <App url={url}/>
          </BrowserRouter>
        </CartProvider>
      </DesignProvider>
    </ProductProvider>
  </React.StrictMode>
  </Auth0Provider>
);

