/**
 * /admin/src/main.tsx
 * Entry point for the admin CMS React app.
 *
 * Dependencies: react, react-dom, ./App, ./styles/*
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/tokens.css'
import './styles/admin.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
