import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { AnimatedNavFramer } from './components/ui/navigation-menu';
import Footer1 from './components/ui/footer-section-1';
import { Analytics } from '@vercel/analytics/react';

// Admin imports
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './pages/admin/AdminLayout';
import Login from './pages/admin/Login';
import CalendarView from './pages/admin/CalendarView';
import ListView from './pages/admin/ListView';
import Settings from './pages/admin/Settings';

const pageVariants = {
  initial: { opacity: 0, filter: 'blur(10px)' },
  animate: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, filter: 'blur(10px)', transition: { duration: 0.3, ease: 'easeIn' } }
};

const PageWrapper = ({ children }) => (
  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex-grow flex flex-col min-h-screen">
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();
  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={
            <PageWrapper>
              <AnimatedNavFramer />
              <main className="flex-grow">
                <Home />
              </main>
              <Footer1 />
            </PageWrapper>
          } />

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<PageWrapper><Login /></PageWrapper>} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<PageWrapper><AdminLayout><Outlet /></AdminLayout></PageWrapper>}>
              <Route index element={<CalendarView />} />
              <Route path="list" element={<ListView />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
      <Analytics />
    </AuthProvider>
  );
}

export default App;
