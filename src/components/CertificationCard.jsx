import React from 'react';
import { FileCode, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button';

const CertificationCard = ({ cert }) => {
  return (
    <div style={styles.card} className="cert-card">
      <div style={styles.header}>
        <div style={styles.iconWrapper}>
          <FileCode size={32} color="#fff" />
        </div>
        <span style={styles.code}>{cert.code}</span>
      </div>
      
      <div style={styles.body}>
        <span style={styles.category}>{cert.category}</span>
        <h3 style={styles.title}>{cert.title}</h3>
        <p style={styles.description}>{cert.description}</p>
        
        <div style={styles.metadata}>
          <div style={styles.metaItem}>
            <span style={styles.metaLabel}>Questions</span>
            <span style={styles.metaValue}>{cert.questionCount}</span>
          </div>
          <div style={styles.metaItem}>
            <span style={styles.metaLabel}>Pass Mark</span>
            <span style={styles.metaValue}>{cert.passMark}%</span>
          </div>
        </div>
      </div>

      <div style={styles.footer}>
        <Link to={cert.path} style={{ width: '100%' }}>
          <Button variant="primary" fullWidth>
            Take Assessment <ArrowRight size={18} style={{ marginLeft: '8px' }} />
          </Button>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: 'var(--bg-card)',
    borderRadius: '16px',
    border: '1px solid var(--border-subtle)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
    position: 'relative',
    height: '100%',
  },
  header: {
    height: '140px',
    background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.2), rgba(236, 72, 153, 0.1))',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '1px solid var(--border-subtle)',
  },
  iconWrapper: {
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '1.2rem',
    border: '1px solid rgba(255,255,255,0.2)',
    boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)',
  },
  code: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'rgba(0,0,0,0.5)',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'var(--text-muted)',
    border: '1px solid var(--border-subtle)',
  },
  body: {
    padding: '1.5rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  category: {
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--accent-cyan)',
    marginBottom: '0.75rem',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'var(--text-main)',
    marginBottom: '0.75rem',
    lineHeight: 1.3,
  },
  description: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    marginBottom: '1.5rem',
    flex: 1,
  },
  metadata: {
    display: 'flex',
    gap: '1.5rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid var(--border-subtle)',
  },
  metaItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  metaLabel: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
  },
  metaValue: {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'var(--text-main)',
  },
  footer: {
    padding: '1.5rem',
    paddingTop: 0,
  }
};

export default CertificationCard;
