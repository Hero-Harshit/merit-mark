import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getCredential } from '../utils/storage';
import { Printer, ChevronLeft } from 'lucide-react';
import Button from '../components/Button';

const Certificate = () => {
  const navigate = useNavigate();
  const credential = getCredential();

  if (!credential) {
    return <Navigate to="/" />;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="animate-fade-in" style={styles.container}>
      {/* Actions Navbar - Hidden when printing */}
      <div style={styles.actionsBar} className="no-print">
        <Button variant="ghost" onClick={() => navigate('/')}>
          <ChevronLeft size={20} /> Back to Home
        </Button>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="primary" onClick={handlePrint}>
            <Printer size={18} style={{ marginRight: '8px' }} /> Print / PDF
          </Button>
        </div>
      </div>

      {/* Printable Certificate Area */}
      <div style={styles.printWrapper}>
        <div style={styles.certificate}>
          <div style={styles.innerBorder}>
            
            <div style={styles.header}>
              <h1 style={styles.brand}>MERIT MARK</h1>
            </div>

            <div style={styles.body}>
              <p style={styles.certLabel}>CERTIFICATE OF ACHIEVEMENT</p>
              <p style={styles.presentedTo}>This certificate is proudly presented to</p>
              
              <h2 style={styles.studentName}>{credential.studentName}</h2>
              
              <p style={styles.reason}>for successfully completing</p>
              <h3 style={styles.certificationName}>{credential.certification}</h3>
              
              <div style={styles.scoreSection}>
                <p>with a score of</p>
                <div style={styles.scoreRow}>
                  <span style={styles.score}>{credential.score}%</span>
                  <span style={styles.grade}>Grade {credential.grade}</span>
                </div>
              </div>
            </div>

            <div style={styles.footer}>
              <div style={styles.footerColumn}>
                <span style={styles.footerLabel}>Date Issued</span>
                <span style={styles.footerValue}>{credential.issueDate}</span>
              </div>
              <div style={styles.footerColumn}>
                <span style={styles.footerLabel}>Credential ID</span>
                <span style={styles.footerValue}>{credential.credentialId}</span>
              </div>
              <div style={styles.footerColumn}>
                <span style={styles.footerLabel}>Verification</span>
                <span style={styles.footerValue}>meritmark.com/verify</span>
              </div>
            </div>

            {/* Decorative elements */}
            <div style={styles.cornerTL}></div>
            <div style={styles.cornerBR}></div>
            <div style={styles.watermark}>MERIT MARK</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
  },
  actionsBar: {
    width: '100%',
    maxWidth: '1000px',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '2rem',
  },
  printWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  certificate: {
    width: '1000px',
    height: '700px',
    background: '#ffffff',
    color: '#0f172a',
    position: 'relative',
    padding: '30px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
    // Print-specific rules will apply from index.css overrides naturally 
    // but the inline styles here guarantee layout consistency
  },
  innerBorder: {
    width: '100%',
    height: '100%',
    border: '2px solid #e2e8f0',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  brand: {
    fontSize: '2rem',
    fontWeight: '800',
    letterSpacing: '0.2em',
    color: '#0f172a',
  },
  body: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  certLabel: {
    fontSize: '1.25rem',
    fontWeight: '700',
    letterSpacing: '0.4em',
    color: '#334155',
    marginBottom: '40px',
  },
  presentedTo: {
    fontSize: '1.1rem',
    color: '#64748b',
    marginBottom: '20px',
    fontStyle: 'italic',
  },
  studentName: {
    fontSize: '3.5rem',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '30px',
    fontFamily: 'serif',
  },
  reason: {
    fontSize: '1.1rem',
    color: '#64748b',
    marginBottom: '10px',
  },
  certificationName: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: '40px',
  },
  scoreSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  scoreRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  score: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#0f172a',
  },
  grade: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#fff',
    background: '#10b981',
    padding: '4px 12px',
    borderRadius: '20px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid #e2e8f0',
    paddingTop: '20px',
    marginTop: 'auto',
  },
  footerColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  footerLabel: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  footerValue: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#334155',
  },
  cornerTL: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '150px',
    height: '150px',
    borderTop: '6px solid #2563eb',
    borderLeft: '6px solid #2563eb',
  },
  cornerBR: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '150px',
    height: '150px',
    borderBottom: '6px solid #ec4899',
    borderRight: '6px solid #ec4899',
  },
  watermark: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(-45deg)',
    fontSize: '10rem',
    fontWeight: '800',
    color: 'rgba(0,0,0,0.02)',
    pointerEvents: 'none',
    zIndex: -1,
  }
};

export default Certificate;
