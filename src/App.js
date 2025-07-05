import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Shield,
  Zap,
  Cloud,
  TrendingUp,
  Globe,
  Loader2,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import './App.css';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formState, setFormState] = useState('idle');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openCalendly = () => {
    const calendlyUrl = 'https://calendly.com/nagpal-aaditya/30min';
    window.open(calendlyUrl, '_blank');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setFormState('loading');

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          company: formData.company,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setFormState('success');
        setFormData({ firstName: '', lastName: '', email: '', company: '', message: '' });
        setTimeout(() => setFormState('idle'), 5000);
      } else {
        setFormState('error');
        setTimeout(() => setFormState('idle'), 5000);
      }
    } catch (error) {
      setFormState('error');
      setTimeout(() => setFormState('idle'), 5000);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="app">
      {/* Background Elements */}
      <div className="background-container">
        <div className="gradient-base"></div>
        <div className="gradient-overlay"></div>
        
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        
        <div
          className="mouse-orb"
          style={{
            left: mousePosition.x - 160,
            top: mousePosition.y - 160,
          }}
        ></div>
        
        <div className="grid-pattern"></div>
      </div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-content">
            <div className="logo">
              <span className="logo-text">ClarqAI</span>
            </div>
            <div className="nav-links">
              <a href="#home" className="nav-link">Home</a>
              <button onClick={scrollToContact} className="nav-link">Contact</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <div className="badge-dot"></div>
                <span className="badge-text">Climate-Adaptive Risk Quantification</span>
              </div>

              <h1 className="hero-title">
                <span className="title-line">We quantify</span>
                <span className="title-gradient">climate risk</span>
              </h1>

              <div className="hero-description">
                <p className="description-main">Over 90% global insurable risk remains uninsured</p>
                <p className="description-sub">Parametric insurance in the age of AI</p>
                <p className="description-detail">
                  We provide services related to Parametric insurances for events which are affected by the climatic changes
                </p>
              </div>

              <div className="hero-actions">
                <button onClick={scrollToContact} className="cta-button">
                  <span>Schedule Demo</span>
                  <ArrowRight className="cta-icon" />
                </button>
              </div>
            </div>

            <div className="hero-cards">
              <div className="floating-card card-1">
                <div className="card-content">
                  <div className="card-icon-container">
                    <Shield className="card-icon" />
                  </div>
                  <h3 className="card-title">AI Risk Assessment</h3>
                  <p className="card-description">
                    Advanced algorithms analyze climate data with unprecedented accuracy
                  </p>
                </div>
                <div className="card-divider"></div>
              </div>

              <div className="floating-card card-2">
                <div className="card-content">
                  <div className="card-icon-container">
                    <Zap className="card-icon" />
                  </div>
                  <h3 className="card-title">Parametric Solutions</h3>
                  <p className="card-description">
                    Automated insurance with instant payouts
                  </p>
                </div>
                <div className="card-divider"></div>
              </div>

              <div className="floating-card card-3">
                <div className="card-content">
                  <div className="card-icon-container">
                    <Cloud className="card-icon" />
                  </div>
                  <h3 className="card-title">Climate Adaptive</h3>
                  <p className="card-description">Dynamic models that evolve</p>
                </div>
                <div className="card-divider"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">
              Transforming <span className="text-purple">risk management</span>
            </h2>
            <p className="features-description">
              Advanced AI-powered solutions for the next generation of parametric insurance
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-content">
                <TrendingUp className="feature-icon" />
                <h3 className="feature-title">Real-Time Analytics</h3>
                <p className="feature-description">
                  Monitor climate events and risk factors with advanced real-time data processing and predictive modeling.
                </p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-content">
                <Globe className="feature-icon" />
                <h3 className="feature-title">Global Coverage</h3>
                <p className="feature-description">
                  Comprehensive parametric insurance solutions covering climate risks across all global regions and markets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-container">
          <div className="contact-header">
            <div className="contact-badge">
              <div className="badge-dot"></div>
              <span className="badge-text">Get In Touch</span>
            </div>
            <h2 className="contact-title">
              Ready to <span className="text-purple">transform</span> risk?
            </h2>
            <p className="contact-description">
              Get in touch to join the Parametric Insurance Revolution
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-form-card">
              <div className="form-content">
                <h3 className="form-title">Send us a message</h3>

                {formState === 'success' && (
                  <div className="message success-message">
                    <CheckCircle className="message-icon" />
                    <p>Message sent successfully! We'll get back to you soon.</p>
                  </div>
                )}

                {formState === 'error' && (
                  <div className="message error-message">
                    <AlertCircle className="message-icon" />
                    <p>Failed to send message. Please try again.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName" className="form-label">First Name</label>
                      <input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={`form-input ${errors.firstName ? 'error' : ''}`}
                        placeholder="John"
                        disabled={formState === 'loading'}
                      />
                      {errors.firstName && <p className="error-text">{errors.firstName}</p>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName" className="form-label">Last Name</label>
                      <input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={`form-input ${errors.lastName ? 'error' : ''}`}
                        placeholder="Doe"
                        disabled={formState === 'loading'}
                      />
                      {errors.lastName && <p className="error-text">{errors.lastName}</p>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="john@example.com"
                      disabled={formState === 'loading'}
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="company" className="form-label">Company</label>
                    <input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className={`form-input ${errors.company ? 'error' : ''}`}
                      placeholder="Your Company"
                      disabled={formState === 'loading'}
                    />
                    {errors.company && <p className="error-text">{errors.company}</p>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className={`form-textarea ${errors.message ? 'error' : ''}`}
                      placeholder="Tell us about your parametric insurance needs..."
                      disabled={formState === 'loading'}
                    />
                    {errors.message && <p className="error-text">{errors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={formState === 'loading'}
                    className="form-submit"
                  >
                    {formState === 'loading' ? (
                      <>
                        <Loader2 className="loading-icon" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            </div>

            <div className="contact-info">
              <div className="info-card">
                <div className="info-content">
                  <h3 className="info-title">Contact Information</h3>
                  <div className="info-items">
                    <div className="info-item">
                      <div className="info-icon-container">
                        <Mail className="info-icon" />
                      </div>
                      <div>
                        <h4 className="info-label">Email</h4>
                        <p className="info-value">contact@clarqai.com</p>
                      </div>
                    </div>
                    <div className="info-item">
                      <div className="info-icon-container">
                        <Phone className="info-icon" />
                      </div>
                      <div>
                        <h4 className="info-label">Phone</h4>
                        <p className="info-value">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="info-item">
                      <div className="info-icon-container">
                        <MapPin className="info-icon" />
                      </div>
                      <div>
                        <h4 className="info-label">Address</h4>
                        <p className="info-value">
                          123 Innovation Drive<br />
                          Tech Hub, CA 94105<br />
                          United States
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="demo-card">
                <div className="demo-content">
                  <div className="demo-icon-container">
                    <Sparkles className="demo-icon" />
                  </div>
                  <h3 className="demo-title">Schedule a Demo</h3>
                  <p className="demo-description">
                    See how our AI-powered parametric insurance solutions can transform your risk management strategy.
                  </p>
                  <button onClick={openCalendly} className="demo-button">
                    Book a Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-logo">
              <span className="logo-text">ClarqAI</span>
            </div>
            <p className="footer-text">
              © 2025 ClarqAI. All rights reserved.<br />
              Climate-Adaptive Risk Quantification.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;