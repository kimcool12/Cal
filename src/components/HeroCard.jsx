import React from 'react';
import { format } from 'date-fns';

const HeroCard = ({ article }) => {
    if (!article) return null;
    const { urlToImage, title, description, source, publishedAt, url } = article;

    const bgImage = urlToImage || 'https://via.placeholder.com/1200x600/0f172a/94a3b8?text=Breaking+News';

    return (
        <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block', marginBottom: '40px' }}>
            <article style={{
                position: 'relative',
                width: '100%',
                height: '500px',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                transition: 'var(--transition)'
            }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale-[1.01]';
                    e.currentTarget.querySelector('.hero-bg').style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.querySelector('.hero-bg').style.transform = 'scale(1)';
                }}
            >
                {/* Background Image */}
                <div className="hero-bg" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.7s ease'
                }}></div>

                {/* Gradient Overlay */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to top, #0f172a 0%, rgba(15, 23, 42, 0.7) 50%, transparent 100%)'
                }}></div>

                {/* Content */}
                <div className="container" style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '40px',
                    zIndex: 2
                }}>
                    <span style={{
                        background: 'var(--accent-primary)',
                        color: '#fff',
                        padding: '6px 16px',
                        borderRadius: '99px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '15px',
                        display: 'inline-block'
                    }}>
                        {source.name}
                    </span>

                    <h1 style={{
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        color: '#fff',
                        marginBottom: '15px',
                        maxWidth: '900px',
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                        lineHeight: 1.1
                    }}>
                        {title}
                    </h1>

                    <p style={{
                        fontSize: '1.1rem',
                        color: '#cbd5e1',
                        maxWidth: '700px',
                        marginBottom: '25px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}>
                        {description}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <button className="btn btn-primary">Read Full Story</button>
                        <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                            {publishedAt ? format(new Date(publishedAt), 'MMMM d, yyyy') : ''}
                        </span>
                    </div>
                </div>
            </article>
        </a>
    );
};

export default HeroCard;
