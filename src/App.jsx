import React from 'react';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import NewsCard from './components/NewsCard';
import HeroCard from './components/HeroCard';
import StatusMessage from './components/StatusMessage';
import { useNews } from './hooks/useNews';
import './App.css';

function App() {
  const { articles, loading, error, category, setCategory, handleSearch } = useNews();

  return (
    <div className="app-layout">
      <Header onSearch={handleSearch} />

      <main className="main-content container">
        <CategoryFilter activeCategory={category} onSelect={setCategory} />

        {loading && <StatusMessage type="loading" />}

        {error && <StatusMessage type="error" message={error} onRetry={() => window.location.reload()} />}

        {!loading && !error && articles.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
            No articles found. Try a different search.
          </div>
        )}

        {!loading && !error && articles.length > 0 && (
          <>
            {/* Hero Section for First Article */}
            <HeroCard article={articles[0]} />

            <h2 style={{
              fontSize: '2rem',
              marginBottom: '25px',
              marginTop: '40px',
              borderLeft: '4px solid var(--accent-primary)',
              paddingLeft: '15px'
            }}>
              Recent Articles
            </h2>

            {/* Grid for remaining articles */}
            <div className="news-grid">
              {articles.slice(1).map((article, index) => (
                <NewsCard key={`${article.url}-${index}`} article={article} />
              ))}
            </div>
          </>
        )}
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '30px',
        color: 'var(--text-secondary)',
        borderTop: '1px solid var(--glass-border)',
        marginTop: 'auto'
      }}>
        <p>© {new Date().getFullYear()} NewsToday. Designed for excellence.</p>
      </footer>
    </div>
  );
}

export default App;
