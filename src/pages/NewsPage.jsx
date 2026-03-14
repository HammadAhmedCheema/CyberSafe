import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import { fetchHackerNewsStories } from '../services/ApiService';

const NewsPage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getArticles = async () => {
            try {
                const data = await fetchHackerNewsStories();
                setArticles(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getArticles();
    }, []);

    const heroData = {
        title: "Latest Tech & Security News",
        subtitle: "Stay informed with the top stories from the Hacker News community."
    };

    return (
        <div>
            <Hero title={heroData.title} subtitle={heroData.subtitle} />
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {loading && <p className="loading-state">Loading top stories...</p>}
                    {error && <p className="error-state">Error: {error}</p>}
                    
                    {!loading && !error && (
                        <div className="articles-container">
                            {articles.map(article => (
                                <article key={article.id} className="news-article">
                                    <h3 className="article-title">{article.title}</h3>
                                    
                                    <div className="article-meta">
                                        <div className="meta-info">
                                            <span>By: {article.by}</span>
                                            <span className="mx-2">|</span>
                                            <span>{article.score} Points</span>
                                        </div>
                                        <a 
                                            href={article.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="read-button"
                                        >
                                            Read Story
                                        </a>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default NewsPage;