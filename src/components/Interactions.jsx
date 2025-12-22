import React, { useState, useEffect } from 'react';
import { getComments, postComment, getLikes, likeArticle } from '../services/newsApi';
import { format } from 'date-fns';

const Interactions = ({ articleUrl }) => {
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState({ userName: '', content: '' });
    const [loadingComments, setLoadingComments] = useState(false);

    useEffect(() => {
        // Load initial likes
        getLikes(articleUrl).then(setLikes);
    }, [articleUrl]);

    const handleLike = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        try {
            // Optimistic update
            setLikes(prev => prev + 1);
            const newCount = await likeArticle(articleUrl);
            setLikes(newCount.count);
        } catch (error) {
            console.error("Like failed", error);
        }
    };

    const toggleComments = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!showComments) {
            setLoadingComments(true);
            const data = await getComments(articleUrl);
            setComments(data);
            setLoadingComments(false);
        }
        setShowComments(!showComments);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!newComment.userName.trim() || !newComment.content.trim()) return;

        try {
            const savedComment = await postComment(articleUrl, newComment.userName, newComment.content);
            setComments([savedComment, ...comments]);
            setNewComment({ userName: '', content: '' });
        } catch (error) {
            console.error("Comment failed", error);
            alert('Failed to post comment');
        }
    };

    // Prevent clicks in interaction area from triggering card link
    const stopProp = (e) => e.stopPropagation();

    return (
        <div className="interactions" onClick={stopProp} style={{ marginTop: '15px', borderTop: '1px solid var(--glass-border)', paddingTop: '10px' }}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <button
                    onClick={handleLike}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: '1rem',
                        transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#ef4444'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                >
                    ❤️ {likes}
                </button>

                <button
                    onClick={toggleComments}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                    }}
                >
                    💬 {comments.length > 0 ? comments.length : ''} Comments
                </button>
            </div>

            {showComments && (
                <div style={{ marginTop: '15px', animation: 'fadeIn 0.3s ease' }}>

                    {/* Comment Form */}
                    <form onSubmit={handleCommentSubmit} style={{ marginBottom: '15px' }}>
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={newComment.userName}
                            onChange={e => setNewComment({ ...newComment, userName: e.target.value })}
                            onClick={stopProp}
                            style={{
                                width: '100%',
                                marginBottom: '8px',
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid var(--glass-border)',
                                background: 'rgba(255,255,255,0.05)',
                                color: 'white'
                            }}
                        />
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <input
                                type="text"
                                placeholder="Write a comment..."
                                value={newComment.content}
                                onChange={e => setNewComment({ ...newComment, content: e.target.value })}
                                onClick={stopProp}
                                style={{
                                    flex: 1,
                                    padding: '8px',
                                    borderRadius: '4px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'rgba(255,255,255,0.05)',
                                    color: 'white'
                                }}
                            />
                            <button type="submit" className="btn btn-primary" style={{ padding: '8px 15px', fontSize: '0.8rem' }}>Post</button>
                        </div>
                    </form>

                    {/* Comment List */}
                    {loadingComments ? (
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Loading comments...</div>
                    ) : (
                        <div style={{ maxHeight: '200px', overflowY: 'auto', paddingRight: '5px' }}>
                            {comments.length === 0 && <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>No comments yet. Be the first!</div>}
                            {comments.map(c => (
                                <div key={c.id} style={{ marginBottom: '10px', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '8px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                        <span style={{ fontWeight: '600', fontSize: '0.85rem', color: 'var(--accent-primary)' }}>{c.user_name}</span>
                                        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                                            {format(new Date(c.created_at), 'MMM d, HH:mm')}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{c.content}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
            <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        </div>
    );
};

export default Interactions;
