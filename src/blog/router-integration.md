# Router Integration Guide

## How to integrate React Router into the existing app

### 1. `src/main.tsx` — Wrap app in BrowserRouter

```diff
 import { StrictMode } from 'react'
 import { createRoot } from 'react-dom/client'
+import { BrowserRouter } from 'react-router-dom'
 import './index.css'
 import App from './App.tsx'

 createRoot(document.getElementById('root')!).render(
   <StrictMode>
-    <App />
+    <BrowserRouter>
+      <App />
+    </BrowserRouter>
   </StrictMode>,
 )
```

### 2. `src/App.tsx` — Add Routes

```diff
 import { useState, useEffect } from 'react'
+import { Routes, Route } from 'react-router-dom'
 import './App.css'
 import { siteConfig, socialLinks, projects } from './config'
+import BlogIndex from './blog/BlogIndex'
+import BlogPost from './blog/BlogPost'

 // ... (icons and helpers unchanged)

-function App() {
+function HomePage() {
   // Move ALL existing JSX (hero, projects, footer) into this component.
-  const [dark, toggleTheme] = useTheme()
   return (
-    <div className="portfolio">
-      <button className="theme-toggle" ... />
-      <header className="hero">...</header>
-      <section className="projects">...</section>
-      <footer className="footer">...</footer>
-      <p className="footer__bottom">...</p>
-    </div>
+    <>
+      <header className="hero">...</header>
+      <section className="projects">...</section>
+      <footer className="footer">...</footer>
+      <p className="footer__bottom">...</p>
+    </>
   )
 }

+function App() {
+  const [dark, toggleTheme] = useTheme()
+  return (
+    <div className="portfolio">
+      <button className="theme-toggle" onClick={toggleTheme} ...>
+        {dark ? <SunIcon /> : <MoonIcon />}
+      </button>
+      <Routes>
+        <Route path="/" element={<HomePage />} />
+        <Route path="/blog" element={<BlogIndex />} />
+        <Route path="/blog/:slug" element={<BlogPost />} />
+      </Routes>
+    </div>
+  )
+}
```

### Summary

- **`main.tsx`**: wrap `<App />` with `<BrowserRouter>`
- **`App.tsx`**: extract page content into `<HomePage />`, add `<Routes>` with three routes
- Theme toggle stays in `App` so it persists across all pages
