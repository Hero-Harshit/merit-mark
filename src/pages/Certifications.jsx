import React, { useState } from 'react';
import { Search } from 'lucide-react';
import CertificationCard from '../components/CertificationCard';
import { certifications, categories } from '../data/certifications';

const Certifications = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Certifications');

  const filteredCerts = certifications.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cert.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All Certifications' || cert.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="animate-fade-in" style={styles.container}>
      <div style={styles.sectionHeader}>
        <h1 style={styles.sectionTitle}>Available Certifications</h1>
        <p style={styles.sectionSubtitle}>Test your knowledge, prove your understanding, and earn your Merit Mark.</p>
      </div>

      <div style={styles.explorer}>
        {/* Search Bar */}
        <div style={styles.searchContainer}>
          <Search style={styles.searchIcon} size={20} />
          <input 
            type="text" 
            placeholder="Search certifications..." 
            style={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filters */}
        <div style={styles.categories}>
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              style={{
                ...styles.categoryPill, 
                ...(activeCategory === cat ? styles.categoryPillActive : {})
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status Line */}
        <div style={styles.statusLine}>
          Showing {filteredCerts.length} {filteredCerts.length === 1 ? 'certification' : 'certifications'}
        </div>

        {/* Grid */}
        {filteredCerts.length > 0 ? (
          <div style={styles.grid}>
            {filteredCerts.map(cert => (
              <CertificationCard key={cert.id} cert={cert} />
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.emptyGlow}></div>
            <h3>No certifications found</h3>
            <p>{searchQuery ? "Try a different search term." : "More assessments are coming soon."}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    padding: '4rem 1.5rem 6rem',
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
  explorer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  searchContainer: {
    position: 'relative',
    maxWidth: '600px',
    margin: '0 auto',
    width: '100%',
  },
  searchIcon: {
    position: 'absolute',
    left: '1.2rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--text-muted)',
  },
  searchInput: {
    width: '100%',
    padding: '1.2rem 1.2rem 1.2rem 3.5rem',
    background: 'var(--bg-card)',
    border: '1px solid var(--border-subtle)',
    borderRadius: '12px',
    color: 'var(--text-main)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  categories: {
    display: 'flex',
    gap: '0.75rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  categoryPill: {
    padding: '0.5rem 1.25rem',
    borderRadius: '20px',
    background: 'transparent',
    border: '1px solid var(--border-subtle)',
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  categoryPillActive: {
    background: 'var(--text-main)',
    color: 'var(--bg-dark)',
    border: '1px solid var(--text-main)',
  },
  statusLine: {
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem',
  },
  emptyState: {
    padding: '6rem 2rem',
    textAlign: 'center',
    background: 'var(--bg-card)',
    borderRadius: '16px',
    border: '1px dashed var(--border-subtle)',
    position: 'relative',
    overflow: 'hidden',
  },
  emptyGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '150px',
    height: '150px',
    background: 'var(--accent-pink)',
    filter: 'blur(100px)',
    opacity: 0.1,
  }
};

export default Certifications;
