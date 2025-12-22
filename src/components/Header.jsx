import React, { useState } from 'react';
import '../App.css'; // Ensure styles are loaded

const Header = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <header className="glass-panel" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            padding: '15px 0',
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            borderRadius: 0
        }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="logo" style={{ fontSize: '1.8rem', fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>
                    <span style={{ color: 'var(--accent-primary)' }}>News</span>Today
                </div>

                <form onSubmit={handleSubmit} style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
                    <input
                        type="text"
                        placeholder="Search news..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px 20px',
                            paddingRight: '40px',
                            borderRadius: '99px',
                            border: '1px solid var(--glass-border)',
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: 'var(--text-primary)',
                            outline: 'none',
                            backdropFilter: 'blur(10px)',
                            transition: 'var(--transition)'
                        }}
                        onFocus={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                        onBlur={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
                    />
                    <button type="submit" style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer'
                    }}>
                        🔍
                    </button>
                </form>
            </div>
        </header>
    );
};

export default Header;
