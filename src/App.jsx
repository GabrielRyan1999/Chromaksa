import { Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import { AnimatedNavFramer } from './components/ui/navigation-menu';
import Footer1 from './components/ui/footer-section-1';

// Admin imports
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './pages/admin/AdminLayout';
import Login from './pages/admin/Login';
import CalendarView from './pages/admin/CalendarView';
import ListView from './pages/admin/ListView';
import Settings from './pages/admin/Settings';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <div className="flex flex-col min-h-screen">
            <AnimatedNavFramer />
            <main className="flex-grow">
              <Home />
            </main>
            <Footer1 />
          </div>
        } />

        {/* Admin Login Route */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout><Outlet /></AdminLayout>}>
            <Route index element={<CalendarView />} />
            <Route path="list" element={<ListView />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
