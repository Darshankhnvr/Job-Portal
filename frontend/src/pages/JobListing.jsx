import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Briefcase } from 'lucide-react';
import { jobService } from '../services/jobService';
import JobCard from '../components/JobCard';
import Input from '../components/Input';
import './JobListing.css';

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [searchTerm, locationFilter, jobs]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await jobService.getAllJobs();
      setJobs(data);
      setFilteredJobs(data);
    } catch (err) {
      setError('Failed to load jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationFilter) {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  };

  const handleJobClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
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
    <div className="job-listing-page">
      <div className="container">
        <div className="page-header">
          <h1>
            <Briefcase size={40} />
            Browse Jobs
          </h1>
          <p>Discover your next career opportunity</p>
        </div>

        {/* Search and Filters */}
        <div className="search-section">
          <div className="search-input">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search by title, company, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-input">
            <MapPin size={20} />
            <input
              type="text"
              placeholder="Filter by location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="results-count">
          <p>
            {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
          </p>
        </div>

        {/* Job Grid */}
        {filteredJobs.length > 0 ? (
          <div className="jobs-grid">
            {filteredJobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                onClick={() => handleJobClick(job._id)}
              />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <Briefcase size={64} />
            <h3>No jobs found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListing;
