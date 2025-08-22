import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import ContextProvider from './contexts/ContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*
    *** Pour pouvoir utiliser le context
    */}
    <ContextProvider>
      {/*
      *** Tous les element enfant de ContextProvider ont acces aux context
      *** Pour utiliser les routes
      */}
      <RouterProvider router={router} />
    </ContextProvider>

  </StrictMode>,
)
