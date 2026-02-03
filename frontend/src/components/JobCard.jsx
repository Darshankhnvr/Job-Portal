import { MapPin, Building2, Calendar } from 'lucide-react';
import Card from './Card';
import './JobCard.css';

const JobCard = ({ job, onClick }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="job-card" hover onClick={onClick}>
      <div className="job-card-header">
        <h3 className="job-title">{job.title}</h3>
        <div className="job-company">
          <Building2 size={16} />
          <span>{job.company}</span>
        </div>
      </div>

      <p className="job-description">
        {job.description.length > 150
          ? `${job.description.substring(0, 150)}...`
          : job.description}
      </p>

      <div className="job-card-footer">
        <div className="job-location">
          <MapPin size={16} />
          <span>{job.location}</span>
        </div>
        <div className="job-date">
          <Calendar size={16} />
          <span>{formatDate(job.createdAt)}</span>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;
