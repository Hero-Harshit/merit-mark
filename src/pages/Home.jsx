import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="animate-fade-in" style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>
            A Mark of <span className="text-gradient">What You Know.</span>
          </h1>
          <p style={styles.subtitle}>
            Take knowledge assessments, demonstrate your skills, and earn certificates that represent what you know.
          </p>
          <div style={styles.heroActions}>
            <Link to="/certifications" style={{ textDecoration: 'none' }}>
              <button style={{...styles.btn, background: 'var(--text-main)', color: 'var(--bg-dark)'}}>
                Explore Certifications
              </button>
            </Link>
            <Link to="/verify" style={{ textDecoration: 'none' }}>
              <button style={{...styles.btn, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)', color: 'var(--text-main)'}}>
                Verify a Certificate
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>How It Works</h2>
          <p style={styles.sectionSubtitle}>Three simple steps to prove your knowledge.</p>
        </div>
        <div style={styles.stepsGrid}>
          <div style={styles.stepCard}>
            <div style={styles.stepNum}>1</div>
            <h3>Choose an Assessment</h3>
            <p>Select a certification and begin your knowledge test.</p>
          </div>
          <div style={styles.stepCard}>
            <div style={styles.stepNum}>2</div>
            <h3>Prove Your Knowledge</h3>
            <p>Complete the assessment and demonstrate your understanding.</p>
          </div>
          <div style={styles.stepCard}>
            <div style={styles.stepNum}>3</div>
            <h3>Earn Your Credential</h3>
            <p>Pass the assessment and receive a Merit Mark certificate.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4rem',
  },
  hero: {
    padding: '8rem 1.5rem 6rem',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'relative',
    background: 'radial-gradient(circle at top, rgba(34, 211, 238, 0.08) 0%, transparent 50%)',
  },
  heroContent: {
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
  },
  title: {
    fontSize: 'clamp(3rem, 8vw, 5rem)',
    fontWeight: '800',
    lineHeight: '1.1',
    letterSpacing: '-0.03em',
  },
  subtitle: {
    fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
    color: 'var(--text-muted)',
    maxWidth: '600px',
  },
  heroActions: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  btn: {
    padding: '1rem 2rem',
    fontSize: '1rem',
    fontWeight: '600',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  section: {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    padding: '0 1.5rem 6rem',
  },
  sectionHeader: {
    marginBottom: '3rem',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '1rem',
  },
  sectionSubtitle: {
    color: 'var(--text-muted)',
    fontSize: '1.1rem',
  },
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  stepCard: {
    background: 'var(--bg-card)',
    padding: '2.5rem 2rem',
    borderRadius: '16px',
    border: '1px solid var(--border-subtle)',
    position: 'relative',
    overflow: 'hidden',
  },
  stepNum: {
    fontSize: '4rem',
    fontWeight: '800',
    color: 'rgba(255,255,255,0.05)',
    position: 'absolute',
    top: '-10px',
    right: '10px',
    lineHeight: 1,
  }
};

export default Home;
