import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Briefcase, FileText, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { applicationService } from '../services/applicationService';
import Card from '../components/Card';
import './Dashboard.css';

const UserDashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await applicationService.getMyApplications();
      setApplications(data);
    } catch (err) {
      console.error('Failed to fetch applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      icon: <FileText size={32} />,
      label: 'Total Applications',
      value: applications.length,
      color: 'primary',
    },
    {
      icon: <Briefcase size={32} />,
      label: 'Active Jobs',
      value: applications.length,
      color: 'secondary',
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div className="user-welcome">
            <div className="user-avatar">
              <User size={32} />
            </div>
            <div>
              <h1>Welcome back, {user?.name}!</h1>
              <p>Here's your job search overview</p>
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
            <Link to="/jobs">
              <Card className="action-card" hover>
                <Briefcase size={28} />
                <h3>Browse Jobs</h3>
                <p>Explore new opportunities</p>
              </Card>
            </Link>
            <Link to="/applications">
              <Card className="action-card" hover>
                <FileText size={28} />
                <h3>My Applications</h3>
                <p>Track your applications</p>
              </Card>
            </Link>
          </div>
        </div>

        {/* Recent Applications */}
        {applications.length > 0 && (
          <div className="recent-section">
            <h2>Recent Applications</h2>
            <div className="applications-list">
              {applications.slice(0, 5).map((app) => (
                <Card key={app._id} className="application-item" hover>
                  <div className="application-info">
                    <h3>{app.jobId?.title || 'Job Title'}</h3>
                    <p>{app.jobId?.company || 'Company'}</p>
                  </div>
                  <div className="application-date">
                    {new Date(app.appliedAt).toLocaleDateString()}
                  </div>
                </Card>
              ))}
            </div>
            {applications.length > 5 && (
              <Link to="/applications" className="view-all-link">
                View All Applications →
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
