import React from 'react';
import { format } from 'date-fns';

const HeroCard = ({ article }) => {
    if (!article) return null;
    const { urlToImage, title, description, source, publishedAt, url } = article;

    // Use a high-res placeholder if image is missing, but prefer the article image
    const bgImage = urlToImage || 'https://via.placeholder.com/1600x900/0f172a/94a3b8?text=Breaking+News';

    return (
        <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block', marginBottom: '60px' }}>
            <article className="hero-card" style={{
                position: 'relative',
                width: '100%',
                height: '75vh', // Much taller, immersive feel
                maxHeight: '800px',
                minHeight: '500px',
                borderRadius: '12px', // Slightly sharper corners for a "news" feel
                overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)', // Deep shadow
                isolation: 'isolate'
            }}>
                {/* Background Image Container */}
                <div className="hero-bg-container" style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: -1,
                    transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}>
                    <div className="hero-bg" style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transition: 'transform 0.7s ease'
                    }}></div>
                </div>

                {/* Cinematic Gradient Overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, #0f172a 0%, rgba(15, 23, 42, 0.8) 40%, rgba(15, 23, 42, 0.2) 70%, transparent 100%)',
                    zIndex: 1
                }}></div>

                {/* Content */}
                <div className="container" style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '60px 40px',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    height: '100%'
                }}>
                    <div style={{
                        transform: 'translateY(0)',
                        transition: 'transform 0.4s ease-out'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '20px'
                        }}>
                            <span style={{
                                background: 'var(--accent-primary)',
                                color: '#0f172a',
                                padding: '6px 14px',
                                borderRadius: '4px',
                                fontSize: '0.8rem',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: '1.5px',
                            }}>
                                {source.name || 'News'}
                            </span>
                            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', fontWeight: 500 }}>
                                {publishedAt ? format(new Date(publishedAt), 'MMMM d, yyyy') : 'Just Now'}
                            </span>
                        </div>

                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                            color: '#fff',
                            marginBottom: '24px',
                            maxWidth: '1100px',
                            lineHeight: 1.05,
                            fontWeight: 800,
                            letterSpacing: '-0.03em',
                            fontFamily: "'Inter', sans-serif" // More modern, tech feel
                        }}>
                            {title}
                        </h1>

                        <p style={{
                            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                            color: '#e2e8f0',
                            maxWidth: '800px',
                            lineHeight: 1.6,
                            marginBottom: '32px',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            fontWeight: 400
                        }}>
                            {description}
                        </p>
                    </div>
                </div>

                {/* CSS Transition Inject for hover effects */}
                <style>{`
                    .hero-card:hover .hero-bg {
                        transform: scale(1.05);
                    }
                `}</style>
            </article>
        </a>
    );
};

export default HeroCard;
