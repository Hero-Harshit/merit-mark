import React, { useState } from 'react';
import { getCredential } from '../utils/storage';
import { Search, CheckCircle2, XCircle } from 'lucide-react';
import Button from '../components/Button';

const Verify = () => {
  const [searchId, setSearchId] = useState('');
  const [result, setResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setHasSearched(true);
    
    // In a real app, this would be an API call.
    // For this prototype, we check localStorage.
    const localCredential = getCredential();
    
    if (localCredential && localCredential.credentialId === searchId.trim()) {
      setResult(localCredential);
    } else {
      setResult(null);
    }
  };

  return (
    <div className="animate-fade-in" style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Verify a Certificate</h1>
        <p style={styles.subtitle}>Verify a Merit Mark credential using its unique Credential ID.</p>
      </div>

      <div style={styles.searchSection}>
        <form onSubmit={handleVerify} style={styles.searchForm}>
          <div style={styles.inputWrapper}>
            <Search size={20} style={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="e.g. MM-HTML-8F42K7"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              style={styles.input}
            />
          </div>
          <Button type="submit" variant="primary">Verify Credential</Button>
        </form>
      </div>

      {hasSearched && (
        <div style={styles.resultSection}>
          {result ? (
            <div style={styles.successCard}>
              <div style={styles.successHeader}>
                <CheckCircle2 size={32} color="var(--success)" />
                <h2>Credential Verified</h2>
              </div>
              <div style={styles.grid}>
                <div style={styles.infoGroup}>
                  <span style={styles.label}>Student Name</span>
                  <span style={styles.value}>{result.studentName}</span>
                </div>
                <div style={styles.infoGroup}>
                  <span style={styles.label}>Certification</span>
                  <span style={styles.value}>{result.certification}</span>
                </div>
                <div style={styles.infoGroup}>
                  <span style={styles.label}>Score</span>
                  <span style={styles.value}>{result.score}% (Grade {result.grade})</span>
                </div>
                <div style={styles.infoGroup}>
                  <span style={styles.label}>Date Issued</span>
                  <span style={styles.value}>{result.issueDate}</span>
                </div>
                <div style={styles.infoGroup}>
                  <span style={styles.label}>Credential ID</span>
                  <span style={styles.value}>{result.credentialId}</span>
                </div>
                <div style={styles.infoGroup}>
                  <span style={styles.label}>Status</span>
                  <span style={{...styles.value, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px'}}>
                    <div style={{width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)'}}></div>
                    Valid
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div style={styles.errorCard}>
              <XCircle size={48} color="var(--error)" style={{ marginBottom: '1rem' }} />
              <h2>Certificate Not Found</h2>
              <p>We couldn't find a certificate matching the ID "{searchId}". Please check the ID and try again.</p>
              <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Note: This is a frontend prototype. Only credentials generated in this current browser session can be verified.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '4rem 1.5rem',
    minHeight: '70vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: 'var(--text-muted)',
  },
  searchSection: {
    marginBottom: '3rem',
  },
  searchForm: {
    display: 'flex',
    gap: '1rem',
    flexDirection: 'column',
    '@media (minWidth: 600px)': {
      flexDirection: 'row',
    }
  },
  inputWrapper: {
    flex: 1,
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: '1.2rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--text-muted)',
  },
  input: {
    width: '100%',
    padding: '1rem 1rem 1rem 3.5rem',
    background: 'var(--bg-card)',
    border: '1px solid var(--border-subtle)',
    borderRadius: '8px',
    color: 'var(--text-main)',
    fontSize: '1rem',
    outline: 'none',
  },
  resultSection: {
    animation: 'fadeIn 0.3s ease',
  },
  successCard: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-subtle)',
    borderRadius: '16px',
    padding: '2rem',
  },
  successHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem',
    borderBottom: '1px solid var(--border-subtle)',
    paddingBottom: '1.5rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
  },
  infoGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
  },
  value: {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'var(--text-main)',
  },
  errorCard: {
    background: 'rgba(239, 68, 68, 0.05)',
    border: '1px dashed var(--error)',
    borderRadius: '16px',
    padding: '3rem 2rem',
    textAlign: 'center',
  }
};

export default Verify;
