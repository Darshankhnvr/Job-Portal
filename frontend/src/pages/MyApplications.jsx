import { useState, useEffect } from 'react';
import { FileText, Briefcase, MapPin, Calendar } from 'lucide-react';
import { applicationService } from '../services/applicationService';
import Card from '../components/Card';
import './MyApplications.css';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await applicationService.getMyApplications();
      setApplications(data);
    } catch (err) {
      setError('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex-center" style={{ minHeight: '80vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-center" style={{ minHeight: '80vh' }}>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="my-applications-page">
      <div className="container">
        <div className="page-header">
          <h1>
            <FileText size={40} />
            My Applications
          </h1>
          <p>Track all your job applications in one place</p>
        </div>

        {applications.length > 0 ? (
          <div className="applications-grid">
            {applications.map((app) => (
              <Card key={app._id} className="application-card">
                <div className="application-header">
                  <h3>{app.jobId?.title || 'Job Title'}</h3>
                  <div className="application-company">
                    <Briefcase size={16} />
                    <span>{app.jobId?.company || 'Company'}</span>
                  </div>
                </div>

                <div className="application-details">
                  <div className="detail-item">
                    <MapPin size={16} />
                    <span>{app.jobId?.location || 'Location'}</span>
                  </div>
                  <div className="detail-item">
                    <Calendar size={16} />
                    <span>Applied on {formatDate(app.appliedAt)}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="no-applications">
            <FileText size={64} />
            <h3>No Applications Yet</h3>
            <p>Start applying to jobs to see them here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
