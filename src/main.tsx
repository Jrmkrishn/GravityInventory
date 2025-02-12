import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { BrowserRouter as Router } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from './components/ui/sonner.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
        <QueryClientProvider client={queryClient}>
          <Toaster richColors position='top-center' />
          <App />
        </QueryClientProvider>
      </ThemeProvider>
    </Router>
  </StrictMode>,
)
