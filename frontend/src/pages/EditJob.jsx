import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { jobService } from '../services/jobService';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import './CreateJob.css';

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const job = await jobService.getJobById(id);
      setFormData({
        title: job.title,
        company: job.company,
        location: job.location,
        description: job.description,
      });
    } catch (error) {
      setErrors({ fetch: 'Failed to load job details' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Job description is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    try {
      await jobService.updateJob(id, formData);
      navigate('/admin/jobs');
    } catch (error) {
      setErrors({ 
        submit: error.response?.data?.message || 'Failed to update job. Please try again.' 
      });
    } finally {
      setSubmitting(false);
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
    <div className="create-job-page">
      <div className="container">
        <button className="back-button" onClick={() => navigate('/admin/jobs')}>
          <ArrowLeft size={20} />
          Back to Jobs
        </button>

        <Card className="create-job-card">
          <div className="form-header">
            <h1>Edit Job</h1>
            <p>Update job posting details</p>
          </div>

          {errors.fetch && (
            <div className="auth-error">{errors.fetch}</div>
          )}

          <form onSubmit={handleSubmit} className="job-form">
            <Input
              label="Job Title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
              required
              placeholder="e.g. Senior Software Engineer"
            />

            <Input
              label="Company Name"
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              error={errors.company}
              required
              placeholder="e.g. Tech Corp"
            />

            <Input
              label="Location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              error={errors.location}
              required
              placeholder="e.g. San Francisco, CA"
            />

            <div className="input-wrapper">
              <div className={`input-container ${formData.description ? 'active' : ''} ${errors.description ? 'error' : ''}`}>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="input-field"
                  placeholder=" "
                  rows="6"
                />
                <label className="input-label">
                  Job Description <span className="required">*</span>
                </label>
              </div>
              {errors.description && (
                <span className="input-error">{errors.description}</span>
              )}
            </div>

            {errors.submit && (
              <div className="auth-error">{errors.submit}</div>
            )}

            <div className="form-actions">
              <Button 
                type="button" 
                variant="ghost"
                onClick={() => navigate('/admin/jobs')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Updating...' : 'Update Job'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EditJob;
