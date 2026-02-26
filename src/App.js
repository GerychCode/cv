import React, { useState, useEffect } from 'react';
import {
  FiServer,
  FiDatabase,
  FiLayout,
  FiCpu,
  FiUsers,
  FiMessageCircle,
  FiActivity,
  FiTrendingUp,
  FiArrowUpRight
} from 'react-icons/fi';
import portfolioData from './data.json';
import './App.css';

// Словник іконок: співставляє ключі з data.json із компонентами react-icons
const iconComponents = {
  server: FiServer,
  database: FiDatabase,
  layout: FiLayout,
  hardware: FiCpu,
  users: FiUsers,
  message: FiMessageCircle,
  activity: FiActivity,
  trending: FiTrendingUp,
};

// Допоміжний компонент для рендеру іконок
const IconRender = ({ iconName }) => {
  const Icon = iconComponents[iconName];
  return Icon ? <Icon /> : null;
};

const App = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [copied, setCopied] = useState(false);

  const { header, profile, skills, experience, projects } = portfolioData;

  // Відстеження скролу для підсвічування активного пункту меню
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'projects'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 150) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Функція для копіювання пошти в буфер обміну
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Повертаємо текст через 2 секунди
    } catch (err) {
      console.error('Не вдалося скопіювати текст: ', err);
    }
  };

  return (
      <>
        <header>
          <div className="header-container">
            <a href="#" className="logo">{header.logo}</a>
            <nav>
              {header.nav.map((item) => (
                  <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={activeSection === item.id ? 'active' : ''}
                  >
                    {item.label}
                  </a>
              ))}
            </nav>
            <a href={`tel:${profile.phone}`} className="contact-btn">{header.contactBtn}</a>
          </div>
        </header>

        <main>
          {/* Секція About */}
          <section id="about">
            <div className="card profile-card">
              <div className="profile-img-wrapper">
                <img src={profile.image} alt={profile.name} />
              </div>
              <div className="profile-info">
                <h1>{profile.name}</h1>
                <p>{profile.title}</p>
              </div>
              <div className="action-grid">
                {/* Системний виклик номера телефону */}
                <a href={`tel:${profile.phone}`} className="btn btn-primary">
                  Call Me
                </a>
                {/* Копіювання пошти */}
                <button className="btn" onClick={handleCopyEmail}>
                  {copied ? 'Copied! ✅' : 'Copy Email'}
                </button>
              </div>
            </div>

            <div className="details-grid">
              <div className="card">
                <h2 className="section-title">Core Stack & Interests</h2>
                <div className="skills-grid">
                  {skills.map((skill) => (
                      <div key={skill.id} className="skill-item">
                        <IconRender iconName={skill.icon} />
                        <span className="skill-name">{skill.name}</span>
                        {/* Спливаюче віконце (тултип) */}
                        <div className="skill-tooltip">
                          {skill.description}
                        </div>
                      </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <p className="bio-text">
                  {profile.bioText} <strong>{profile.bioHighlight}</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Секція Досвіду */}
          <section id="experience">
            <h2 className="section-title-main">Work Experience</h2>
            <div className="experience-list">
              {experience.map((exp) => (
                  <div key={exp.id} className="card experience-card">
                    <div className="exp-header">
                      <h3>{exp.role}</h3>
                      <span className="exp-date">{exp.date}</span>
                    </div>
                    <div className="exp-company">{exp.company}</div>
                    <p className="exp-desc">{exp.description}</p>
                    <div className="exp-tags">
                      {exp.tags.map((tag, idx) => (
                          <span key={idx}>{tag}</span>
                      ))}
                    </div>
                  </div>
              ))}
            </div>
          </section>

          {/* Секція Проектів */}
          <section id="projects">
            <h2 className="section-title-main">Featured Work</h2>
            <div className="projects-grid">
              {projects.map((project) => (
                  <a key={project.id} href={project.link} className="project-card">
                    <img src={project.image} alt={project.title} className="project-img" />
                    <div className="project-info">
                      <div>
                        <h3>{project.title}</h3>
                        <p>{project.category}</p>
                      </div>
                      <div className="project-link-icon">
                        <FiArrowUpRight size={22} />
                      </div>
                    </div>
                  </a>
              ))}
            </div>
          </section>
        </main>
      </>
  );
};

export default App;