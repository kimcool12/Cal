const express = require('express');
const router = express.Router();
const db = require('../database');

// Get comments for an article
router.get('/comments', (req, res) => {
    const { articleUrl } = req.query;
    if (!articleUrl) return res.status(400).json({ error: 'Article URL required' });

    db.all(
        'SELECT * FROM comments WHERE article_url = ? ORDER BY created_at DESC',
        [articleUrl],
        (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ comments: rows });
        }
    );
});

// Post a comment
router.post('/comments', (req, res) => {
    const { articleUrl, userName, content } = req.body;
    if (!articleUrl || !userName || !content) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    const stmt = db.prepare('INSERT INTO comments (article_url, user_name, content) VALUES (?, ?, ?)');
    stmt.run(articleUrl, userName, content, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Return the new comment
        res.json({
            id: this.lastID,
            article_url: articleUrl,
            user_name: userName,
            content,
            created_at: new Date().toISOString()
        });
    });
    stmt.finalize();
});

// Get likes for an article
router.get('/likes', (req, res) => {
    const { articleUrl } = req.query;
    if (!articleUrl) return res.status(400).json({ error: 'Article URL required' });

    db.get('SELECT count FROM likes WHERE article_url = ?', [articleUrl], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ count: row ? row.count : 0 });
    });
});

// Increment like (Toggle not supported efficiently without user auth, so just increment for demo)
router.post('/likes', (req, res) => {
    const { articleUrl } = req.body;
    if (!articleUrl) return res.status(400).json({ error: 'Article URL required' });

    // Upsert like count
    db.run(`
    INSERT INTO likes (article_url, count) VALUES (?, 1)
    ON CONFLICT(article_url) DO UPDATE SET count = count + 1
  `, [articleUrl], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        // Get updated count
        db.get('SELECT count FROM likes WHERE article_url = ?', [articleUrl], (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ count: row.count });
        });
    });
});

module.exports = router;
