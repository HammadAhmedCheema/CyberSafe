import React from 'react';
import Hero from '../components/Hero';
import AiChat from '../components/AiChat';
import data from '../data/db.json';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const { hero, quickTips } = data.home;

    return (
        <div className="bg-black text-white min-h-screen">
            <Hero title={hero.title} subtitle={hero.subtitle} intro={hero.intro} />
            
            <section className="py-20">
                <div className="container">
                    <h3 className="section-title">Security Core</h3>
                    <div className="cyber-grid">
                        {quickTips.map((tip, index) => (
                            <div key={index} className="glass-card border-glow-blue flex flex-col items-center text-center p-8">
                                <div className="text-4xl mb-4 glow-blue">{tip.icon}</div>
                                <h4 className="text-xl font-bold mb-3 glow-purple">{tip.title}</h4>
                                <p className="text-text-muted text-sm leading-relaxed">{tip.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <section className="py-20 border-t border-white/5 bg-cyber-dark/30">
                <div className="container text-center">
                    <Link to="/practices" className="btn btn-primary text-lg px-12 py-4">
                         Exploration Core: Safe Practices
                    </Link>
                </div>
            </section>
 
            <section className="py-20 bg-gradient-to-b from-transparent to-cyber-black">
                <div className="container">
                    <AiChat />
                </div>
            </section>
        </div>
    );
};

export default HomePage;