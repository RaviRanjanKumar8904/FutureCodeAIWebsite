import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Collaborators from './pages/Collaborators';
import VerifyCertificate from './pages/VerifyCertificate';
import Programs from './pages/Programs';
import Internships from './pages/Internships';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageCollaborators from './pages/admin/ManageCollaborators';
import ManageAdmins from './pages/admin/ManageAdmins';
import ManageEnquiries from './pages/admin/ManageEnquiries';
import ManageCourses from './pages/admin/ManageCourses';
import ActivityLogs from './pages/admin/ActivityLogs';
import ManageGallery from './pages/admin/ManageGallery';
import ManageCertificates from './pages/admin/ManageCertificates';
import ManageStudents from './pages/admin/ManageStudents';
import ManageInternships from './pages/admin/ManageInternships';
import NotFound from './pages/NotFound';
import StudentDashboard from './pages/StudentDashboard';
import InstituteDashboard from './pages/InstituteDashboard';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
    <Router>
      <SmoothScroll>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/collaborators" element={<Collaborators />} />
            <Route path="/verify" element={<VerifyCertificate />} />
            <Route path="/programs/*" element={<Programs />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/internships" element={<Internships />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard/student/*" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/dashboard/institute/*" 
              element={
                <ProtectedRoute allowedRoles={['institute']}>
                  <InstituteDashboard />
                </ProtectedRoute>
              } 
            />
            {/* Additional routes will be added here */}
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="collaborators" element={<ManageCollaborators />} />
              <Route path="admins" element={<ManageAdmins />} />
              <Route path="enquiries" element={<ManageEnquiries />} />
              <Route path="courses" element={<ManageCourses />} />
              {/* Admin Modules */}
              <Route path="internships" element={<ManageInternships />} />
              <Route path="students" element={<ManageStudents />} />
              <Route path="certificates" element={<ManageCertificates />} />
              <Route path="gallery" element={<ManageGallery />} />
              <Route path="logs" element={<ActivityLogs />} />
            </Route>
            
            {/* 404 Catch-All Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </SmoothScroll>
    </Router>
    </AuthProvider>
  );
}

export default App;
