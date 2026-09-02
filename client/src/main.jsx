import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';

import { store } from './app/store.js';
import { logout } from "./features/auth/auth.slice.js";
import { setAuthFailureHandler } from "./config/api.config.js";

import { RouterProvider } from "react-router-dom";
import router from "./app/router.jsx";
import AuthInitializer from './components/auth/AuthInitializer.jsx';

setAuthFailureHandler(() => {
  store.dispatch(logout());
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
        <AuthInitializer>
        <RouterProvider router={router}/>
        </AuthInitializer>
      </Provider>
  </StrictMode>,
)
