import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { getAssessmentResult, saveCredential } from '../utils/storage';
import { calculateGrade, isPassing } from '../utils/grading';
import { generateCredentialId, formatDate } from '../utils/credential';
import Button from '../components/Button';
import { Award, ArrowRight, RefreshCcw } from 'lucide-react';

const Result = () => {
  const navigate = useNavigate();
  const result = getAssessmentResult();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  if (!result) {
    return <Navigate to="/" />;
  }

  const { score, correctCount, totalQuestions, certification } = result;
  const grade = calculateGrade(score);
  const passed = isPassing(score);

  const handleGenerateCertificate = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    const credential = {
      credentialId: generateCredentialId(),
      studentName: name,
      email,
      certification,
      score: Math.round(score),
      grade,
      issueDate: formatDate(),
      status: "valid"
    };

    saveCredential(credential);
    navigate('/certificate');
  };

  return (
    <div className="animate-fade-in" style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={{...styles.iconWrapper, background: passed ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'}}>
            <Award size={48} color={passed ? 'var(--success)' : 'var(--error)'} />
          </div>
          <h1 style={styles.title}>Assessment Complete</h1>
          <p style={styles.subtitle}>
            {passed ? "Congratulations! You've earned your Merit Mark." : "You haven't earned your Merit Mark this time. A score of 50% is required to pass."}
          </p>
        </div>

        <div style={styles.scoreBoard}>
          <div style={styles.scoreMain}>
            <div style={styles.scoreValue}>{Math.round(score)}%</div>
            <div style={styles.gradeValue}>Grade {grade}</div>
          </div>
          <div style={styles.scoreDetails}>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Correct Answers</span>
              <span style={{...styles.detailValue, color: 'var(--success)'}}>{correctCount}</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Incorrect Answers</span>
              <span style={{...styles.detailValue, color: 'var(--error)'}}>{totalQuestions - correctCount}</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Total Questions</span>
              <span style={styles.detailValue}>{totalQuestions}</span>
            </div>
          </div>
        </div>

        {passed ? (
          <div style={styles.claimSection}>
            <h3 style={styles.claimTitle}>Claim Your Certificate</h3>
            <p style={styles.claimSubtitle}>Enter your details below to generate your verifiable credential.</p>
            
            <form onSubmit={handleGenerateCertificate} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  style={styles.input}
                />
              </div>
              {error && <p style={styles.errorText}>{error}</p>}
              
              <Button type="submit" variant="primary" fullWidth size="lg" style={{ marginTop: '1rem' }}>
                Generate Certificate <ArrowRight size={20} style={{ marginLeft: '8px' }} />
              </Button>
            </form>
          </div>
        ) : (
          <div style={styles.failedActions}>
            <Button variant="primary" size="lg" onClick={() => navigate('/assessment/html')}>
              Try Again <RefreshCcw size={18} style={{ marginLeft: '8px' }} />
            </Button>
            <Button variant="ghost" onClick={() => navigate('/')}>
              Back to Certifications
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1.5rem',
  },
  card: {
    background: 'var(--bg-card)',
    padding: '3rem',
    borderRadius: '24px',
    border: '1px solid var(--border-subtle)',
    maxWidth: '600px',
    width: '100%',
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
    position: 'relative',
    overflow: 'hidden',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2.5rem',
  },
  iconWrapper: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'var(--text-main)',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: 'var(--text-muted)',
    fontSize: '1.1rem',
  },
  scoreBoard: {
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '16px',
    padding: '2rem',
    border: '1px solid var(--border-subtle)',
    marginBottom: '2.5rem',
  },
  scoreMain: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '2rem',
    borderBottom: '1px solid var(--border-subtle)',
    paddingBottom: '2rem',
  },
  scoreValue: {
    fontSize: '4.5rem',
    fontWeight: '800',
    lineHeight: 1,
    background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '0.5rem',
  },
  gradeValue: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: 'var(--text-main)',
    background: 'rgba(255,255,255,0.1)',
    padding: '0.25rem 1rem',
    borderRadius: '20px',
  },
  scoreDetails: {
    display: 'flex',
    justifyContent: 'space-around',
    textAlign: 'center',
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  detailLabel: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--text-main)',
  },
  claimSection: {
    borderTop: '1px solid var(--border-subtle)',
    paddingTop: '2.5rem',
  },
  claimTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  claimSubtitle: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: '500',
    color: 'var(--text-main)',
  },
  input: {
    width: '100%',
    padding: '1rem',
    background: 'rgba(0,0,0,0.2)',
    border: '1px solid var(--border-subtle)',
    borderRadius: '8px',
    color: 'var(--text-main)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  errorText: {
    color: 'var(--error)',
    fontSize: '0.85rem',
    marginTop: '0.25rem',
  },
  failedActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
  }
};

export default Result;
