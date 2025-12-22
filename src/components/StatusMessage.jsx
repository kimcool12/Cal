import React from 'react';

const StatusMessage = ({ type, message, onRetry }) => {
    if (type === 'loading') {
        return (
            <div style={{ padding: '60px 0', textAlign: 'center' }}>
                <div className="spinner" style={{
                    width: '50px',
                    height: '50px',
                    border: '4px solid rgba(255,255,255,0.1)',
                    borderTopColor: 'var(--accent-primary)',
                    borderRadius: '50%',
                    margin: '0 auto 20px',
                    animation: 'spin 1s linear infinite'
                }}></div>
                <p style={{ color: 'var(--text-secondary)' }}>Loading top headlines...</p>
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    if (type === 'error') {
        return (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⚠️</div>
                <h3 style={{ marginBottom: '10px', color: 'var(--text-primary)' }}>Oops! Something went wrong.</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>{message}</p>
                {onRetry && (
                    <button className="btn btn-primary" onClick={onRetry}>
                        Try Again
                    </button>
                )}
            </div>
        );
    }

    return null;
};

export default StatusMessage;
