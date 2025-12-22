require('dotenv').config();
const express = require('express');
const cors = require('cors');
const interactionRoutes = require('./routes/interactions');

const app = express();
const PORT = process.env.PORT || 3000;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

app.use(cors());
app.use(express.json());

// Interactions API
app.use('/api', interactionRoutes);

// NewsAPI Proxy
app.get('/api/news', async (req, res) => {
    const { category, q } = req.query;

    if (!NEWS_API_KEY) {
        // If no key on server, return 503 so frontend uses mock
        console.warn('Server missing NEWS_API_KEY');
        return res.status(503).json({ error: 'Server missing API Key' });
    }

    try {
        let url = '';
        if (q) {
            url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&apiKey=${NEWS_API_KEY}`;
        } else {
            url = `https://newsapi.org/v2/top-headlines?country=us&category=${category || 'general'}&apiKey=${NEWS_API_KEY}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`NewsAPI responded with ${response.status}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('NewsAPI Proxy Error:', error);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
