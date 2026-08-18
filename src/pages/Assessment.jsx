import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { htmlQuestions } from '../data/htmlQuestions';
import { saveAssessmentResult, saveAssessmentState, getAssessmentState, clearAssessmentState } from '../utils/storage';
import Button from '../components/Button';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

const Assessment = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(() => {
    const savedState = getAssessmentState();
    return savedState?.currentIndex || 0;
  });
  const [answers, setAnswers] = useState(() => {
    const savedState = getAssessmentState();
    return savedState?.answers || {};
  });
  const totalQuestions = htmlQuestions.length;

  useEffect(() => {
    // Save state on change
    saveAssessmentState({ answers, currentIndex });
  }, [answers, currentIndex]);

  const handleSelectOption = (option) => {
    setAnswers(prev => ({
      ...prev,
      [htmlQuestions[currentIndex].id]: option
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    htmlQuestions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const score = (correctCount / totalQuestions) * 100;
    
    saveAssessmentResult({
      certification: "HTML Fundamentals Certification",
      score,
      correctCount,
      totalQuestions
    });
    
    clearAssessmentState();
    navigate('/result');
  };

  const currentQ = htmlQuestions[currentIndex];
  const selectedAnswer = answers[currentQ.id];
  const progressPercentage = ((Object.keys(answers).length) / totalQuestions) * 100;

  return (
    <div className="animate-fade-in" style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>HTML Fundamentals Assessment</h1>
          <p style={styles.subtitle}>{totalQuestions} Questions · Multiple Choice</p>
        </div>
      </div>

      <div style={styles.progressSection}>
        <div style={styles.progressHeader}>
          <span>Question {currentIndex + 1} of {totalQuestions}</span>
          <span>{Math.round(progressPercentage)}% Completed</span>
        </div>
        <div style={styles.progressBarBg}>
          <div style={{...styles.progressBarFill, width: `${progressPercentage}%`}}></div>
        </div>
      </div>

      <div style={styles.mainContent}>
        {/* Sidebar Navigator */}
        <div style={styles.sidebar}>
          <h3 style={styles.sidebarTitle}>Navigation</h3>
          <div style={styles.navGrid}>
            {htmlQuestions.map((q, idx) => {
              const isAnswered = !!answers[q.id];
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    ...styles.navItem,
                    ...(isCurrent ? styles.navItemCurrent : isAnswered ? styles.navItemAnswered : {})
                  }}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question Area */}
        <div style={styles.questionArea}>
          <div style={styles.questionCard}>
            <h2 style={styles.questionText}>
              <span style={styles.qNum}>{currentIndex + 1}.</span> {currentQ.question}
            </h2>
            
            <div style={styles.optionsList}>
              {currentQ.options.map((option, idx) => {
                const letters = ['A', 'B', 'C', 'D'];
                const isSelected = selectedAnswer === option;
                
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(option)}
                    style={{
                      ...styles.optionBtn,
                      ...(isSelected ? styles.optionBtnSelected : {})
                    }}
                  >
                    <span style={{
                      ...styles.optionLetter,
                      ...(isSelected ? styles.optionLetterSelected : {})
                    }}>
                      {letters[idx]}
                    </span>
                    <span style={styles.optionText}>{option}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Bar */}
          <div style={styles.actionBar}>
            <Button 
              variant="secondary" 
              onClick={handlePrev} 
              disabled={currentIndex === 0}
            >
              <ChevronLeft size={18} style={{ marginRight: '8px' }} /> Previous
            </Button>
            
            {currentIndex === totalQuestions - 1 ? (
              <Button 
                variant="primary" 
                onClick={handleSubmit}
                style={{ background: 'var(--success)', color: '#fff' }}
              >
                Submit Assessment <Check size={18} style={{ marginLeft: '8px' }} />
              </Button>
            ) : (
              <Button variant="primary" onClick={handleNext}>
                Next <ChevronRight size={18} style={{ marginLeft: '8px' }} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    padding: '2rem 1.5rem 6rem',
  },
  header: {
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'var(--text-main)',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: 'var(--text-muted)',
    fontSize: '1rem',
  },
  progressSection: {
    marginBottom: '3rem',
    background: 'var(--bg-card)',
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid var(--border-subtle)',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: 'var(--text-main)',
  },
  progressBarBg: {
    width: '100%',
    height: '8px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-blue))',
    transition: 'width 0.3s ease',
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '2rem',
    '@media (minWidth: 768px)': {
      gridTemplateColumns: '250px 1fr',
    }
  },
  sidebar: {
    background: 'var(--bg-card)',
    padding: '1.5rem',
    borderRadius: '16px',
    border: '1px solid var(--border-subtle)',
    height: 'max-content',
    // basic responsive handling
    '@media (maxWidth: 768px)': {
      display: 'none' // will implement actual responsive CSS if needed
    }
  },
  sidebarTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  navGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '0.5rem',
  },
  navItem: {
    width: '100%',
    aspectRatio: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid transparent',
    color: 'var(--text-muted)',
    fontSize: '0.8rem',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  navItemAnswered: {
    background: 'rgba(34, 211, 238, 0.1)',
    color: 'var(--accent-cyan)',
    border: '1px solid rgba(34, 211, 238, 0.3)',
  },
  navItemCurrent: {
    border: '1px solid var(--text-main)',
    color: 'var(--text-main)',
    background: 'rgba(255,255,255,0.1)',
  },
  questionArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    flex: 1,
  },
  questionCard: {
    background: 'var(--bg-card)',
    padding: '3rem',
    borderRadius: '16px',
    border: '1px solid var(--border-subtle)',
  },
  questionText: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: 'var(--text-main)',
    marginBottom: '2.5rem',
    lineHeight: 1.4,
  },
  qNum: {
    color: 'var(--accent-cyan)',
    marginRight: '0.5rem',
  },
  optionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  optionBtn: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '1.25rem 1.5rem',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--border-subtle)',
    borderRadius: '12px',
    color: 'var(--text-main)',
    fontSize: '1rem',
    textAlign: 'left',
    transition: 'all 0.2s',
  },
  optionBtnSelected: {
    background: 'rgba(34, 211, 238, 0.1)',
    border: '1px solid var(--accent-cyan)',
  },
  optionLetter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: 'rgba(255,255,255,0.1)',
    marginRight: '1rem',
    fontSize: '0.9rem',
    fontWeight: '700',
    color: 'var(--text-muted)',
  },
  optionLetterSelected: {
    background: 'var(--accent-cyan)',
    color: 'var(--bg-dark)',
  },
  optionText: {
    flex: 1,
  },
  actionBar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1.5rem',
    background: 'var(--bg-card)',
    borderRadius: '12px',
    border: '1px solid var(--border-subtle)',
  }
};

export default Assessment;
