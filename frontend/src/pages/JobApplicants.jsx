import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Users, ArrowLeft, Mail, FileText, Calendar } from 'lucide-react';
import { applicationService } from '../services/applicationService';
import Card from '../components/Card';
import Button from '../components/Button';
import './JobApplicants.css';

const JobApplicants = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApplicants();
  }, [id]);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const data = await applicationService.getJobApplicants(id);
      setApplicants(data);
    } catch (err) {
      setError('Failed to load applicants');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-center" style={{ minHeight: '80vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="job-applicants-page">
      <div className="container">
        <button className="back-button" onClick={() => navigate('/admin/jobs')}>
          <ArrowLeft size={20} />
          Back to Jobs
        </button>

        <div className="page-header">
          <div>
            <h1>
              <Users size={40} />
              Job Applicants
            </h1>
            <p>{applicants.length} {applicants.length === 1 ? 'applicant' : 'applicants'} for this position</p>
          </div>
        </div>

        {error && (
          <div className="error-message">{error}</div>
        )}

        {applicants.length > 0 ? (
          <div className="applicants-grid">
            {applicants.map((application) => (
              <Card key={application._id} className="applicant-card">
                <div className="applicant-header">
                  <div className="applicant-avatar">
                    {application.userId?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="applicant-info">
                    <h3>{application.userId?.name || 'Unknown'}</h3>
                    <div className="applicant-detail">
                      <Mail size={16} />
                      {application.userId?.email || 'No email'}
                    </div>
                  </div>
                </div>

                <div className="applicant-details">
                  <div className="detail-item">
                    <Calendar size={16} />
                    <span>Applied on {new Date(application.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  {application.resumeUrl && (
                    <div className="detail-item">
                      <FileText size={16} />
                      <a 
                        href={`http://localhost:3000/${application.resumeUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resume-link"
                      >
                        View Resume
                      </a>
                    </div>
                  )}
                </div>

                <div className="applicant-actions">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open(`mailto:${application.userId?.email}`)}
                  >
                    <Mail size={16} />
                    Contact
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="no-applicants">
            <Users size={64} />
            <h3>No Applicants Yet</h3>
            <p>No one has applied for this position yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplicants;
