import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled, 
  className = '',
  fullWidth = false,
  ...props 
}) => {
  const getStyles = () => {
    let base = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '600',
      borderRadius: '8px',
      transition: 'all 0.2s ease',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      width: fullWidth ? '100%' : 'auto',
    };

    if (size === 'sm') {
      base = { ...base, padding: '0.5rem 1rem', fontSize: '0.875rem' };
    } else if (size === 'lg') {
      base = { ...base, padding: '1rem 2rem', fontSize: '1.125rem' };
    } else {
      base = { ...base, padding: '0.75rem 1.5rem', fontSize: '1rem' };
    }

    if (variant === 'primary') {
      base = {
        ...base,
        background: 'var(--text-main)',
        color: 'var(--bg-dark)',
      };
    } else if (variant === 'secondary') {
      base = {
        ...base,
        background: 'rgba(255, 255, 255, 0.05)',
        color: 'var(--text-main)',
        border: '1px solid var(--border-subtle)',
      };
    } else if (variant === 'danger') {
      base = {
        ...base,
        background: 'rgba(239, 68, 68, 0.1)',
        color: '#ef4444',
        border: '1px solid rgba(239, 68, 68, 0.2)',
      };
    } else if (variant === 'ghost') {
      base = {
        ...base,
        background: 'transparent',
        color: 'var(--text-muted)',
      };
    }

    return base;
  };

  return (
    <button 
      style={getStyles()} 
      onClick={onClick} 
      disabled={disabled}
      className={`btn-${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
