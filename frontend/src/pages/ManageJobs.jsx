import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Edit, Trash2, Plus, Users } from 'lucide-react';
import { jobService } from '../services/jobService';
import Button from '../components/Button';
import Card from '../components/Card';
import Modal from '../components/Modal';
import './ManageJobs.css';

const ManageJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, jobId: null });
  const [deleting, setDeleting] = useState(false);

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

  const handleDelete = async () => {
    if (!deleteModal.jobId) return;

    setDeleting(true);
    try {
      await jobService.deleteJob(deleteModal.jobId);
      setJobs(jobs.filter(job => job._id !== deleteModal.jobId));
      setDeleteModal({ isOpen: false, jobId: null });
    } catch (err) {
      console.error('Failed to delete job:', err);
    } finally {
      setDeleting(false);
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
    <div className="manage-jobs-page">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>
              <Briefcase size={40} />
              Manage Jobs
            </h1>
            <p>Edit or delete your job postings</p>
          </div>
          <Button onClick={() => navigate('/admin/jobs/create')}>
            <Plus size={20} />
            Create New Job
          </Button>
        </div>

        {jobs.length > 0 ? (
          <div className="jobs-list">
            {jobs.map((job) => (
              <Card key={job._id} className="manage-job-card">
                <div className="job-info">
                  <h3>{job.title}</h3>
                  <p className="job-details">
                    {job.company} • {job.location}
                  </p>
                  <p className="job-date">
                    Posted {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="job-actions">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                  >
                    <Users size={18} />
                    Applicants
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/admin/jobs/edit/${job._id}`)}
                  >
                    <Edit size={18} />
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setDeleteModal({ isOpen: true, jobId: job._id })}
                  >
                    <Trash2 size={18} />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="no-jobs">
            <Briefcase size={64} />
            <h3>No Jobs Posted Yet</h3>
            <p>Create your first job posting to get started</p>
            <Button onClick={() => navigate('/admin/jobs/create')}>
              <Plus size={20} />
              Create Job
            </Button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, jobId: null })}
        title="Delete Job"
        size="sm"
      >
        <div className="delete-modal-content">
          <p>Are you sure you want to delete this job posting? This action cannot be undone.</p>
          <div className="modal-actions">
            <Button
              variant="ghost"
              onClick={() => setDeleteModal({ isOpen: false, jobId: null })}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageJobs;
