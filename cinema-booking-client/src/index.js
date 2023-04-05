import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { store } from './store';
import { Provider } from 'react-redux';

//These are all the exported pages that App.js uses to route through. It looks better outside of the main router page
export { default as Navbar } from './components/Navbar/NavbarElements';
export { default as PreviewMovie } from './pages/previewMovie/PreviewMovie';

export { default as Profile } from './pages/profile/Profile';
export { default as TicketSelect } from './pages/booking/TicketSelect';
export { default as SeatSelect } from './pages/booking/SeatSelect';
export { default as OrderSummary } from './pages/booking/OrderSummary';
export { default as Checkout } from './pages/booking/Checkout';
export { default as OrderConfirmation } from './pages/booking/OrderConfirmation';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
