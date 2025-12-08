import React from 'react';
import Hero from '../components/Hero';
import data from '../data/db.json';

const ThreatsPage = () => {
    const { hero, threatList } = data.threats;

    return (
        <div>
            <Hero title={hero.title} subtitle={hero.subtitle} />
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="space-y-8">
                        {threatList.map((threat, index) => (
                             <article key={index} className="threat-article">
                                <div className="text-4xl">{threat.icon}</div>
                                <div>
                                    <h3 className="threat-title">{threat.title}</h3>
                                    <p className="threat-description">{threat.description}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ThreatsPage;