import React from 'react';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import NewsCard from './components/NewsCard';
import HeroCard from './components/HeroCard';
import StatusMessage from './components/StatusMessage';
import { useNews } from './hooks/useNews';
import './App.css';

const CATEGORY_RESOURCES = {
  general: { name: 'BBC News', url: 'https://www.bbc.com/news' },
  business: { name: 'Bloomberg', url: 'https://www.bloomberg.com' },
  technology: { name: 'TechCrunch', url: 'https://techcrunch.com' },
  entertainment: { name: 'Variety', url: 'https://variety.com' },
  sports: { name: 'ESPN', url: 'https://www.espn.com' },
  science: { name: 'ScienceDaily', url: 'https://www.sciencedaily.com' },
  health: { name: 'Healthline', url: 'https://www.healthline.com' }
};

function App() {
  const { articles, loading, error, category, setCategory, handleSearch } = useNews();

  const activeValidCategory = category || 'general';
  const resource = CATEGORY_RESOURCES[activeValidCategory];

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
        {resource && (
          <div style={{ marginBottom: '20px' }}>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--accent-secondary)',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.9rem',
                borderBottom: '1px dashed var(--accent-secondary)',
                paddingBottom: '2px'
              }}
              onMouseEnter={(e) => e.target.style.borderBottomStyle = 'solid'}
              onMouseLeave={(e) => e.target.style.borderBottomStyle = 'dashed'}
            >
              Visit {resource.name} for more {activeValidCategory} news &rarr;
            </a>
          </div>
        )}
        <p>© {new Date().getFullYear()} NewsToday. Designed for excellence.</p>
      </footer>
    </div>
  );
}

export default App;
