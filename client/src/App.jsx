import { useState } from 'react'
import viteLogo from '/vite.svg'
import React from 'react';
import { AuthProvider } from "./context/AuthContext";
import AppRouter from './router/AppRouter';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App
