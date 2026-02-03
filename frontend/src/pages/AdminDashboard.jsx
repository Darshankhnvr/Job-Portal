import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Briefcase, Users, Plus, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { jobService } from '../services/jobService';
import Card from '../components/Card';
import './Dashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await jobService.getAllJobs();
      setJobs(data);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      icon: <Briefcase size={32} />,
      label: 'Total Jobs',
      value: jobs.length,
      color: 'primary',
    },
    {
      icon: <Users size={32} />,
      label: 'Active Listings',
      value: jobs.length,
      color: 'secondary',
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div className="user-welcome">
            <div className="user-avatar">
              <Shield size={32} />
            </div>
            <div>
              <h1>Admin Dashboard</h1>
              <p>Manage your job postings and applications</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <Card key={index} className="stat-card">
              <div className={`stat-icon stat-icon-${stat.color}`}>
                {stat.icon}
              </div>
              <div className="stat-content">
                <p className="stat-label">{stat.label}</p>
                <h2 className="stat-value">{stat.value}</h2>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/admin/jobs/create">
              <Card className="action-card" hover>
                <Plus size={28} />
                <h3>Create Job</h3>
                <p>Post a new job opening</p>
              </Card>
            </Link>
            <Link to="/admin/jobs">
              <Card className="action-card" hover>
                <Settings size={28} />
                <h3>Manage Jobs</h3>
                <p>Edit or delete job postings</p>
              </Card>
            </Link>
          </div>
        </div>

        {/* Recent Jobs */}
        {jobs.length > 0 && (
          <div className="recent-section">
            <h2>Recent Job Postings</h2>
            <div className="applications-list">
              {jobs.slice(0, 5).map((job) => (
                <Card key={job._id} className="application-item" hover>
                  <div className="application-info">
                    <h3>{job.title}</h3>
                    <p>{job.company} • {job.location}</p>
                  </div>
                  <div className="application-date">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </div>
                </Card>
              ))}
            </div>
            {jobs.length > 5 && (
              <Link to="/admin/jobs" className="view-all-link">
                View All Jobs →
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
