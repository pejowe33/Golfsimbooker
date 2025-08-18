import React, { useState } from 'react';

function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (isSignUp) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      }

      if (!formData.phoneNumber) {
        newErrors.phoneNumber = 'Phone number is required';
      } else if (!/^\d{10,}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
        newErrors.phoneNumber = 'Phone number must be at least 10 digits';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const endpoint = isSignUp ? '/api/auth/register' : '/api/auth/login';
      const payload = isSignUp ? {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password
      } : {
        email: formData.email,
        password: formData.password
      };

      console.log('Sending request to:', endpoint);
      console.log('Payload:', { ...payload, password: '[HIDDEN]' });

      // First check if server is accessible
      try {
        const healthResponse = await fetch('/api/health', {
          method: 'GET',
          credentials: 'include'
        });
        
        if (!healthResponse.ok) {
          throw new Error('Server health check failed');
        }
        
        const healthData = await healthResponse.json();
        console.log('Server health check passed:', healthData);
      } catch (healthError) {
        console.error('Health check failed:', healthError);
        throw new Error('Cannot connect to server. Please ensure the server is running on port 5000.');
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        console.log('Response data:', data);
      } else {
        // Get the actual response text to debug
        const textResponse = await response.text();
        console.log('Non-JSON response received:', textResponse);
        
        // Check if it's an HTML error page
        if (textResponse.includes('<html>') || textResponse.includes('<!DOCTYPE')) {
          throw new Error('Server returned an HTML page instead of JSON. Check if the server is running correctly.');
        } else {
          throw new Error(`Server returned invalid response format: ${textResponse.substring(0, 200)}...`);
        }
      }

      if (!response.ok) {
        throw new Error(data.message || `${isSignUp ? 'Registration' : 'Login'} failed`);
      }

      setMessage(data.message || `${isSignUp ? 'Account created' : 'Logged in'} successfully!`);
      
      if (data.user && data.token) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        console.log('User data saved to localStorage:', data.user);
      }

      // Reset form
      setFormData({
        fullName: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

      // Redirect to home page after successful login/registration
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);

    } catch (error) {
      console.error(`${isSignUp ? 'Registration' : 'Login'} error:`, error);
      
      // Provide specific error messages
      if (error.message.includes('Failed to fetch')) {
        setMessage('Network error: Cannot reach the server. Please check if the server is running.');
      } else if (error.message.includes('NetworkError')) {
        setMessage('Network error: Please check your internet connection.');
      } else if (error.message.includes('HTML page')) {
        setMessage('Server configuration error: The server is not responding correctly.');
      } else {
        setMessage(error.message || 'An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      fullName: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setMessage('');
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>{isSignUp ? 'Create Account' : 'Sign In'}</h1>
        <p>{isSignUp ? 'Join GolfSim today' : 'Welcome back to GolfSim'}</p>
      </div>
      
      <section className="auth-form">
        {message && (
          <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={errors.fullName ? 'error' : ''}
                />
                {errors.fullName && <span className="error-text">{errors.fullName}</span>}
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className={errors.phoneNumber ? 'error' : ''}
                />
                {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
              </div>
            </>
          )}
          
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          
          {isSignUp && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input 
                type="password" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>
          )}
          
          <button 
            type="submit" 
            className="cta-button primary"
            disabled={isLoading}
          >
            {isLoading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>
        </form>
        
        <div className="auth-switch">
          <p>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button 
              type="button" 
              className="link-button"
              onClick={toggleMode}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </section>
    </div>
  );
}

export default SignIn;

/* SQL Table Creation Script

-- Create users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone_number TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Create index on email for faster lookups
CREATE INDEX idx_users_email ON users(email);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

-- Create policy to allow user registration
CREATE POLICY "Allow user registration" ON users
  FOR INSERT WITH CHECK (true);

-- Create policy to allow users to update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

*/