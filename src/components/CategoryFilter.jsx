import React from 'react';

const CATEGORIES = [
    'General', 'Business', 'Technology', 'Entertainment', 'Sports', 'Science', 'Health'
];

const CategoryFilter = ({ activeCategory, onSelect }) => {
    return (
        <div className="container" style={{ margin: '30px auto 20px' }}>
            <div style={{
                display: 'flex',
                gap: '12px',
                overflowX: 'auto',
                paddingBottom: '10px',
                scrollbarWidth: 'none' // Firefox
            }}>
                {CATEGORIES.map(cat => {
                    const value = cat.toLowerCase();
                    const isActive = activeCategory === value;
                    return (
                        <button
                            key={value}
                            onClick={() => onSelect(value)}
                            style={{
                                padding: '8px 20px',
                                borderRadius: '99px',
                                border: isActive ? 'none' : '1px solid var(--glass-border)',
                                background: isActive ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                                color: isActive ? '#fff' : 'var(--text-secondary)',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'var(--transition)',
                                fontWeight: 500
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive) {
                                    e.target.style.background = 'var(--glass-border)';
                                    e.target.style.color = 'var(--text-primary)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) {
                                    e.target.style.background = 'var(--bg-secondary)';
                                    e.target.style.color = 'var(--text-secondary)';
                                }
                            }}
                        >
                            {cat}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryFilter;
