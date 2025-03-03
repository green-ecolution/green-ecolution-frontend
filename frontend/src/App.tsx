import { Outlet, useLocation } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './api/queryClient'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { Suspense, useEffect, useRef } from 'react'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import ToastProvider from './context/ToastContext'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './components/layout/ErrorFallback'

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : React.lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      }))
    )

function App() {
  useDocumentTitle()
  const location = useLocation();
  const errorBoundaryRef = useRef<any>(null);

  useEffect(() => {
    if (errorBoundaryRef.current) {
      errorBoundaryRef.current.resetErrorBoundary();
    }
  }, [location.pathname]);
  
  return (
    <>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} position="bottom" />
          <Suspense>
            <TanStackRouterDevtools
              initialIsOpen={false}
              position="bottom-right"
            />
          </Suspense>
          <Header />
          <main className="flex-1 lg:pl-20">
            <ErrorBoundary FallbackComponent={ErrorFallback} ref={errorBoundaryRef}>
              <Outlet />
            </ErrorBoundary>
          </main>
          <Footer />
        </QueryClientProvider>
      </ToastProvider>
    </>
  )
}

export default App
