import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Building2, Calendar, ArrowLeft, Briefcase } from 'lucide-react';
import { jobService } from '../services/jobService';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Card from '../components/Card';
import Modal from '../components/Modal';
import './JobDetail.css';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [resume, setResume] = useState(null);
  const [applying, setApplying] = useState(false);
  const [applyError, setApplyError] = useState('');
  const [applySuccess, setApplySuccess] = useState(false);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const data = await jobService.getJobById(id);
      setJob(data);
    } catch (err) {
      setError('Failed to load job details.');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role === 'admin') {
      return;
    }
    setShowApplyModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResume(file);
      setApplyError('');
    } else {
      setApplyError('Please upload a PDF file');
      setResume(null);
    }
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    
    if (!resume) {
      setApplyError('Please upload your resume');
      return;
    }

    setApplying(true);
    setApplyError('');

    try {
      const formData = new FormData();
      formData.append('resume', resume);

      const { applicationService } = await import('../services/applicationService');
      await applicationService.applyToJob(id, formData);
      
      setApplySuccess(true);
      setTimeout(() => {
        setShowApplyModal(false);
        navigate('/applications');
      }, 2000);
    } catch (err) {
      setApplyError(err.response?.data?.message || 'Failed to submit application');
    } finally {
      setApplying(false);
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

  if (error || !job) {
    return (
      <div className="flex-center" style={{ minHeight: '80vh' }}>
        <div className="error-message">{error || 'Job not found'}</div>
      </div>
    );
  }

  return (
    <div className="job-detail-page">
      <div className="container">
        <button className="back-button" onClick={() => navigate('/jobs')}>
          <ArrowLeft size={20} />
          Back to Jobs
        </button>

        <Card className="job-detail-card">
          <div className="job-detail-header">
            <div className="job-icon">
              <Briefcase size={32} />
            </div>
            <div className="job-header-content">
              <h1>{job.title}</h1>
              <div className="job-meta">
                <div className="meta-item">
                  <Building2 size={18} />
                  <span>{job.company}</span>
                </div>
                <div className="meta-item">
                  <MapPin size={18} />
                  <span>{job.location}</span>
                </div>
                <div className="meta-item">
                  <Calendar size={18} />
                  <span>Posted {formatDate(job.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="job-detail-body">
            <h3>Job Description</h3>
            <p className="job-full-description">{job.description}</p>
          </div>

          {user?.role !== 'admin' && (
            <div className="job-detail-footer">
              <Button size="lg" onClick={handleApply}>
                Apply Now
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* Apply Modal */}
      <Modal
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
        title="Apply for this Job"
      >
        {applySuccess ? (
          <div className="success-message">
            <h3>Application Submitted!</h3>
            <p>Redirecting to your applications...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmitApplication} className="apply-form">
            <div className="file-upload">
              <label htmlFor="resume" className="file-label">
                Upload Resume (PDF)
              </label>
              <input
                type="file"
                id="resume"
                accept=".pdf"
                onChange={handleFileChange}
                className="file-input"
              />
              {resume && (
                <p className="file-name">Selected: {resume.name}</p>
              )}
            </div>

            {applyError && (
              <div className="auth-error">{applyError}</div>
            )}

            <Button type="submit" fullWidth disabled={applying || !resume}>
              {applying ? 'Submitting...' : 'Submit Application'}
            </Button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default JobDetail;
