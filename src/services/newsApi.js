const API_URL = 'http://localhost:3000/api';

const MOCK_ARTICLES = [
    {
        source: { id: 'wired', name: 'Wired' },
        author: 'Steven Levy',
        title: 'The Future of AI is Here, and It\'s Beautiful',
        description: 'Artificial intelligence is reshaping our world with specific focus on generative art and design.',
        url: 'https://wired.com',
        urlToImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
        publishedAt: new Date().toISOString(),
        content: 'Full article content would go here...'
    },
    {
        source: { id: 'the-verge', name: 'The Verge' },
        author: 'Nilay Patel',
        title: 'Review: The Ultimate Smart Home Hub',
        description: 'We tested the latest smart home gadgets to see which ones actually make life easier.',
        url: 'https://theverge.com',
        urlToImage: 'https://images.unsplash.com/photo-1752262167753-37a0ec83f614?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21hcnQlMjBob21lJTIwaHVifGVufDB8fDB8fHww',
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        content: '...'
    },
    {
        source: { id: 'cnn', name: 'CNN Business' },
        author: 'Anna Stewart',
        title: 'Global Markets Rally as Tech Stocks Soar',
        description: 'Major indices hit record highs today driven by semiconductor breakthroughs.',
        url: 'https://cnn.com',
        urlToImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800',
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
        content: '...'
    },
    {
        source: { id: 'mock-news', name: 'Mock News' },
        author: 'Demo User',
        title: 'Fullstack Interactions Ready',
        description: 'You can now like and comment on articles. Data is persisted in SQLite.',
        url: 'https://example.com/demo',
        urlToImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=800',
        publishedAt: new Date().toISOString(),
        content: '...'
    },
    {
        source: { id: 'arch-daily', name: 'ArchDaily' },
        author: 'Maria Francis',
        title: 'Sustainable Architecture: Building for the Future',
        description: 'New eco-friendly materials are revolutionizing the construction industry.',
        url: '#',
        urlToImage: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800',
        publishedAt: new Date(Date.now() - 250000000).toISOString(),
        content: '...'
    },
    {
        source: { id: 'tech-crunch', name: 'TechCrunch' },
        author: 'Alex Wilhelm',
        title: 'The Next Generation of Quantum Computing',
        description: 'Major breakthroughs in qubit stability announced at global summit.',
        url: '#',
        urlToImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
        publishedAt: new Date(Date.now() - 400000000).toISOString(),
        content: '...'
    },
    {
        source: { id: 'culinary-insider', name: 'Culinary Insider' },
        author: 'Chef Ramsey',
        title: 'Fusion Cuisine: East Meets West',
        description: 'Exploring the delicious combinations of Asian and European flavors.',
        url: '#',
        urlToImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
        publishedAt: new Date(Date.now() - 600000000).toISOString(),
        content: '...'
    },
    {
        source: { id: 'travel-weekly', name: 'Travel Weekly' },
        author: 'Jessica Globe',
        title: 'Hidden Gems of the Mediterranean',
        description: 'Escape the crowds and discover these untouched island paradises.',
        url: '#',
        urlToImage: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800',
        publishedAt: new Date(Date.now() - 800000000).toISOString(),
        content: '...'
    }
];

export const fetchTopHeadlines = async (category = 'general') => {
    try {
        // Try backend proxy first
        const response = await fetch(`${API_URL}/news?category=${category}`);

        // If backend is missing key (503) or down, fall back to mock
        if (response.status === 503 || !response.ok) {
            console.warn('Backend proxy unavailable or missing key. Using mock data.');
            await new Promise(resolve => setTimeout(resolve, 500));
            if (category === 'general') return { articles: MOCK_ARTICLES };
            return {
                articles: MOCK_ARTICLES.filter(a =>
                    category === 'technology' ? a.source.name === 'Wired' : true
                )
            };
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error (using mock):', error);
        // Fallback on network error too
        return { articles: MOCK_ARTICLES };
    }
};

export const searchNews = async (query) => {
    if (!query) return { articles: [] };

    try {
        const response = await fetch(`${API_URL}/news?q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Search failed');
        return await response.json();
    } catch (error) {
        console.warn('Search backend failed, using mock filter');
        const lowerQuery = query.toLowerCase();
        return {
            articles: MOCK_ARTICLES.filter(a =>
                a.title.toLowerCase().includes(lowerQuery) ||
                a.description.toLowerCase().includes(lowerQuery)
            )
        };
    }
};

// Interaction APIs
export const getComments = async (articleUrl) => {
    try {
        const res = await fetch(`${API_URL}/comments?articleUrl=${encodeURIComponent(articleUrl)}`);
        if (!res.ok) return [];
        const data = await res.json();
        return data.comments || [];
    } catch (e) { return []; }
};

export const postComment = async (articleUrl, userName, content) => {
    const res = await fetch(`${API_URL}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleUrl, userName, content })
    });
    if (!res.ok) throw new Error('Failed to post comment');
    return await res.json();
};

export const getLikes = async (articleUrl) => {
    try {
        const res = await fetch(`${API_URL}/likes?articleUrl=${encodeURIComponent(articleUrl)}`);
        if (!res.ok) return 0;
        const data = await res.json();
        return data.count || 0;
    } catch (e) { return 0; }
};

export const likeArticle = async (articleUrl) => {
    const res = await fetch(`${API_URL}/likes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleUrl })
    });
    if (!res.ok) throw new Error('Failed to like');
    return await res.json();
};
