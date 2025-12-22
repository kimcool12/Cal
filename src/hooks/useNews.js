import { useState, useEffect, useCallback } from 'react';
import { fetchTopHeadlines, searchNews } from '../services/newsApi';

export const useNews = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState('general');

    const loadHeadlines = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchTopHeadlines(category);
            setArticles(data.articles || []);
        } catch (err) {
            setError('Failed to load news. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [category]);

    const handleSearch = async (query) => {
        if (!query.trim()) {
            loadHeadlines();
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = await searchNews(query);
            setArticles(data.articles || []);
        } catch (err) {
            setError('Search failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadHeadlines();
    }, [loadHeadlines]);

    return {
        articles,
        loading,
        error,
        category,
        setCategory,
        handleSearch
    };
};
