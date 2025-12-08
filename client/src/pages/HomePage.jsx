import React from 'react';
import Hero from '../components/Hero';
import AiChat from '../components/AiChat';
import data from '../data/db.json';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const { hero, quickTips } = data.home;

    return (
        <div>
            <Hero title={hero.title} subtitle={hero.subtitle} intro={hero.intro} />
            
            <section className="tips-section">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="section-title">Quick Safety Tips</h3>
                    <div className="tips-grid">
                        {quickTips.map((tip, index) => (
                            <div key={index} className="tip-card">
                                <div className="tip-icon">{tip.icon}</div>
                                <h4 className="tip-title">{tip.title}</h4>
                                <p className="tip-text">{tip.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <section className="cta-section">
                <div className="container mx-auto px-4">
                    <Link to="/practices" className="cta-button">
                        Learn Safe Practices
                    </Link>
                </div>
            </section>

            <section className="chat-section">
                <div className="container mx-auto px-4">
                    <AiChat />
                </div>
            </section>
        </div>
    );
};

export default HomePage;