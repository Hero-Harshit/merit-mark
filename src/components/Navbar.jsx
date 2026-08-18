import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BadgeCheck } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isCertificatePage = location.pathname.startsWith('/certificate');

  if (isCertificatePage) return null; // Hide navbar on actual certificate for printing

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          <div style={styles.iconContainer}>
            <BadgeCheck size={24} color="var(--accent-cyan)" />
          </div>
          <span style={styles.logoText}>Merit Mark</span>
        </Link>

        {/* Desktop Nav */}
        <nav style={styles.desktopNav}>
          <Link to="/certifications" style={styles.navLink}>Certifications</Link>
          <a href="#how-it-works" style={styles.navLink}>How It Works</a>
          <Link to="/verify" style={styles.navLink}>Verify Certificate</Link>
        </nav>

      </div>
    </header>
  );
};

const styles = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    background: 'var(--glass-bg)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid var(--border-subtle)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  iconContainer: {
    background: 'rgba(34, 211, 238, 0.1)',
    padding: '0.5rem',
    borderRadius: '8px',
    display: 'flex',
  },
  logoText: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'var(--text-main)',
    letterSpacing: '-0.02em',
  },
  desktopNav: {
    display: 'none',
    '@media (min-width: 768px)': {
      display: 'flex',
    },
    gap: '2rem',
  },
  navLink: {
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'color 0.2s',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  menuBtn: {
    display: 'block',
    '@media (min-width: 768px)': {
      display: 'none',
    },
  },
  mobileNav: {
    padding: '1rem 1.5rem',
    background: 'var(--bg-card)',
    borderBottom: '1px solid var(--border-subtle)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  mobileNavLink: {
    color: 'var(--text-main)',
    fontSize: '1rem',
    fontWeight: '500',
    padding: '0.5rem 0',
  }
};

// Adding simple inline media queries using a wrapper would be complex in pure inline styles,
// so we'll just handle desktop nav visibility with standard CSS classes in index.css if needed, 
// or let flex handle it. Since we are using inline styles for quick dev, let's fix the media query limitation.

export default Navbar;
