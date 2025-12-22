import React from 'react';
import { format } from 'date-fns';
import Interactions from './Interactions';

const NewsCard = ({ article }) => {
    const { urlToImage, title, description, source, publishedAt, url } = article;

    // Fallback image if null
    const bgImage = urlToImage || 'https://via.placeholder.com/400x250/1e293b/94a3b8?text=No+Image';

    return (
        <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <article className="glass-panel" style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                transition: 'var(--transition)'
            }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                }}
            >
                <div style={{ position: 'relative', paddingTop: '60%', overflow: 'hidden' }}>
                    <img
                        src={bgImage}
                        alt={title}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease'
                        }}
                        onError={(e) => e.target.src = 'https://via.placeholder.com/400x250/1e293b/94a3b8?text=Image+Error'}
                    />
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '10px 20px',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
                    }}>
                        <span style={{
                            color: 'var(--accent-primary)',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            {source.name}
                        </span>
                    </div>
                </div>

                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{
                        fontSize: '1.2rem',
                        marginBottom: '10px',
                        color: 'var(--text-primary)',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical'
                    }}>
                        {title}
                    </h3>

                    <p style={{
                        fontSize: '0.95rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '20px',
                        flex: 1,
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical'
                    }}>
                        {description}
                    </p>

                    <div style={{
                        marginTop: 'auto',
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <time>{publishedAt ? format(new Date(publishedAt), 'MMM d, yyyy') : 'Recently'}</time>
                        <span style={{ fontWeight: 500, color: 'var(--accent-secondary)' }}>Read More →</span>
                    </div>

                    <Interactions articleUrl={url} />
                </div>
            </article>
        </a>
    );
};

export default NewsCard;
