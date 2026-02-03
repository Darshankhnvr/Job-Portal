import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
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

    setLoading(true);
    try {
      await login(formData, isAdmin);
      navigate(isAdmin ? '/admin/dashboard' : '/dashboard');
    } catch (error) {
      setErrors({ 
        submit: error.response?.data?.message || 'Login failed. Please check your credentials.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <Card className="auth-card">
          <div className="auth-header">
            <div className="auth-icon">
              {isAdmin ? <Shield size={40} /> : <LogIn size={40} />}
            </div>
            <h2>{isAdmin ? 'Admin Login' : 'Welcome Back'}</h2>
            <p className="auth-subtitle">
              {isAdmin ? 'Access admin dashboard' : 'Sign in to your account'}
            </p>
          </div>

          <div className="auth-toggle">
            <button
              type="button"
              className={`toggle-btn ${!isAdmin ? 'active' : ''}`}
              onClick={() => setIsAdmin(false)}
            >
              User Login
            </button>
            <button
              type="button"
              className={`toggle-btn ${isAdmin ? 'active' : ''}`}
              onClick={() => setIsAdmin(true)}
            >
              Admin Login
            </button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            {errors.submit && (
              <div className="auth-error">{errors.submit}</div>
            )}

            <Button 
              type="submit" 
              fullWidth 
              size="lg"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          {!isAdmin && (
            <div className="auth-footer">
              <p>
                Don't have an account?{' '}
                <Link to="/register" className="auth-link">Sign Up</Link>
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Login;
