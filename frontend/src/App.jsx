import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CourseDetails from './pages/CourseDetails';
import LearningPath from './pages/LearningPath';
import Payments from './pages/Payments';
import Documents from './pages/Documents';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import LearningResources from './pages/LearningResources';
import SidebarLayout from './components/SidebarLayout';

const ProtectedRoute = ({ children, role }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (role && user.role !== role) return <Navigate to="/" />;
    return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<ProtectedRoute><SidebarLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="course" element={<CourseDetails />} />
            <Route path="learning-path" element={<LearningPath />} />
            <Route path="resources" element={<LearningResources />} />
            <Route path="payments" element={<Payments />} />
            <Route path="documents" element={<Documents />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="/admin" element={<ProtectedRoute role="admin"><SidebarLayout /></ProtectedRoute>}>
            <Route index element={<AdminPanel />} />
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
