import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import JobListing from './pages/JobListing';
import JobDetail from './pages/JobDetail';
import UserDashboard from './pages/UserDashboard';
import MyApplications from './pages/MyApplications';
import AdminDashboard from './pages/AdminDashboard';
import CreateJob from './pages/CreateJob';
import ManageJobs from './pages/ManageJobs';
import EditJob from './pages/EditJob';
import JobApplicants from './pages/JobApplicants';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/jobs" element={<JobListing />} />
              <Route path="/jobs/:id" element={<JobDetail />} />

              {/* User Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/applications"
                element={
                  <ProtectedRoute>
                    <MyApplications />
                  </ProtectedRoute>
                }
              />

              {/* Admin Protected Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/jobs"
                element={
                  <ProtectedRoute requireAdmin>
                    <ManageJobs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/jobs/create"
                element={
                  <ProtectedRoute requireAdmin>
                    <CreateJob />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/jobs/edit/:id"
                element={
                  <ProtectedRoute requireAdmin>
                    <EditJob />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/jobs/:id/applicants"
                element={
                  <ProtectedRoute requireAdmin>
                    <JobApplicants />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
