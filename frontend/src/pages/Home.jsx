import { Link } from 'react-router-dom';
import { Briefcase, Search, Users, TrendingUp, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: <Search size={32} />,
      title: 'Easy Job Search',
      description: 'Find your dream job with our advanced search and filtering options.',
    },
    {
      icon: <Briefcase size={32} />,
      title: 'Top Companies',
      description: 'Connect with leading companies and explore exciting opportunities.',
    },
    {
      icon: <Users size={32} />,
      title: 'Simple Application',
      description: 'Apply to multiple jobs with just a few clicks and track your applications.',
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Career Growth',
      description: 'Take your career to the next level with opportunities that match your skills.',
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title animate-fadeIn">
              Find Your <span className="gradient-text">Dream Job</span> Today
            </h1>
            <p className="hero-subtitle animate-fadeIn">
              Discover thousands of job opportunities from top companies around the world.
              Start your career journey with us.
            </p>
            <div className="hero-buttons animate-fadeIn">
              <Link to="/jobs">
                <Button size="lg">
                  Browse Jobs <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="lg">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="hero-decoration">
          <div className="floating-circle circle-1"></div>
          <div className="floating-circle circle-2"></div>
          <div className="floating-circle circle-3"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Us</h2>
            <p>Everything you need to find your perfect job</p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <Card key={index} className="feature-card animate-fadeIn" hover>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <Card className="cta-card">
            <h2>Ready to Start Your Journey?</h2>
            <p>Join thousands of job seekers who found their dream careers through our platform.</p>
            <Link to="/register">
              <Button size="lg">Create Free Account</Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
