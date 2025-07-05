import './lib/tokens.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { getSupabase } from '@/lib/supabase';
import AuthProvider from '@/providers/AuthProvider';

import App from './App.tsx';

// Initialize Supabase client
getSupabase();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
