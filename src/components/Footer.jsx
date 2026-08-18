import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/certificate')) return null;

  return (
    <footer style={styles.footer} className="no-print">
      <div style={styles.container}>
        {location.pathname !== '/' && (
          <div style={styles.top}>
            <div>
              <h3 style={styles.brand}>Merit Mark</h3>
              <p style={styles.tagline}>A mark of what you know.</p>
            </div>
            <div style={styles.links}>
              <a href="/certifications" style={styles.link}>Certifications</a>
              <a href="/verify" style={styles.link}>Verify Certificate</a>
              <a href="#" style={styles.link}>About Merit Mark</a>
            </div>
          </div>
        )}
        <div style={{...styles.bottom, borderTop: location.pathname === '/' ? 'none' : '1px solid var(--border-subtle)'}}>
          <p>© {new Date().getFullYear()} Merit Mark. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    borderTop: '1px solid var(--border-subtle)',
    padding: '4rem 1.5rem 2rem',
    marginTop: 'auto',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '2rem',
    marginBottom: '3rem',
  },
  brand: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--text-main)',
    marginBottom: '0.5rem',
  },
  tagline: {
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
  },
  links: {
    display: 'flex',
    gap: '2rem',
  },
  link: {
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    transition: 'color 0.2s',
  },
  bottom: {
    borderTop: '1px solid var(--border-subtle)',
    paddingTop: '2rem',
    color: 'var(--text-muted)',
    fontSize: '0.85rem',
    textAlign: 'center',
  }
};

export default Footer;
