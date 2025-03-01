// src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('sending');

    try {
      // Use the environment variable for the endpoint
      const endpoint = process.env.REACT_APP_CONTACT_ENDPOINT || '/.netlify/functions/contact';
      const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="app">
      <div id="top">
        <header className="headers">
          <div className="container">
            <h1><a href="#top">Lee's Portfolio</a></h1>
            <p className="title"></p>
            <nav>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </nav>
          </div>
        </header>
      </div>
      <section id="hero" className="container">
        <div className="hero-content">
          <h2>Hi, I'm <span className="highlight">Lee Hamin,</span></h2>
          <p className="lead">
            Bachelor of Engineering in Computer Science, 2026 <br/> The University of Hong Kong</p>
          <div className="cta-buttons">
            <a href="#projects" className="btn primary">View My Work</a>
            <a href="#contact" className="btn secondary">Contact Me</a>
          </div>
        </div>
      </section>

      <section id="about" className="container section">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>I'm a passionate software developer who's interested in diverse fields within computer science such as web development and AI.
              I am a highly driven software developer with a diverse background that equips me to collaborate effectively,
              approach challenges with a logical mindset, and apply strong technical expertise to deliver innovative solutions.
              any challenge.</p>
          </div>
        </div>
      </section>

      <section id="projects" className="container section">
        <h2>Projects</h2>
        <div className="projects-grid">
          {/* Project 1 */}
          <div className="project-card">
            <div className="project-content">
              <h3>Stock Trading Insights Using LLMs</h3>
              <p>A web application built with React and Node.js that helps users see the insights of the stock
                based on the sentiment analysis.</p>
              <div className="tech-stack">
                <span>React</span>
                <span>Node.js</span>
                <span>Amazon Web Services (AWS)</span>
                <span>Kubernetes</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/lamooon/Stock-Trading-Insights-Using-LLMs" className="btn small secondary">GitHub</a>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="project-card">
            <div className="project-content">
              <h3>PennyKeeper - Financial Habit Tracking App</h3>
              <p>An app that features that tracks your financial expenditure habits.</p>
              <div className="tech-stack">
                <span>Kotlin</span>
                <span>Room DB</span>
                <span>Git</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/lamooon/PennyKeeper" className="btn small secondary">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="container section">
        <h2>Skills</h2>
        <div className="skills-container">
          <div className="skill-category">
            <h3>Languages</h3>
            <div className="skills-list">
              <div className="skill-item">Python</div>
              <div className="skill-item">Java</div>
              <div className="skill-item">Kotlin</div>
              <div className="skill-item">HTML/CSS/JavaScript</div>
              <div className="skill-item">C</div>
              <div className="skill-item">SQL</div>
            </div>
          </div>

          <div className="skill-category">
            <h3>Frameworks & Technologies</h3>
            <div className="skills-list">
              <div className="skill-item">React</div>
              <div className="skill-item">NodeJS</div>
              <div className="skill-item">MySQL</div>
              <div className="skill-item">Kubernetes</div>
            </div>
          </div>

          <div className="skill-category">
            <h3>Development Tools</h3>
            <div className="skills-list">
              <div className="skill-item">Amazon Web Services (AWS)</div>
              <div className="skill-item">Git</div>
              <div className="skill-item">Docker</div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="container section">
        <h2>Get In Touch</h2>
        <div className="contact-content">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn primary">
              {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {submitStatus === 'success' && (
              <p className="form-status success">Message sent successfully!</p>
            )}
            {submitStatus === 'error' && (
              <p className="form-status error">Failed to send message. Please try again.</p>
            )}
          </form>

          <div className="contact-info">
            <div className="contact-item">
              <h3>Email</h3>
              <p>leehamin35@gmail.com</p>
            </div>
            <div className="contact-item">
              <h3>Social</h3>
              <div className="social-links">
                <a href="https://github.com/lamooon" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/haminlee-hku/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Lee's Portfolio</p>
        </div>
      </footer>
    </div>
  );
}

export default App;