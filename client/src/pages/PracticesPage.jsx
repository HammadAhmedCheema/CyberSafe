import React from 'react';
import Hero from '../components/Hero';
import data from '../data/db.json';

const PracticesPage = () => {
    const { hero, practiceList } = data.practices;

    return (
        <div>
            <Hero title={hero.title} subtitle={hero.subtitle} />
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="space-y-8">
                        {practiceList.map((practice, index) => (
                            <article key={index} className="practice-article">
                                <div className="text-4xl">{practice.icon}</div>
                                <div>
                                    <h3 className="practice-title">{practice.title}</h3>
                                    <p className="practice-description">{practice.description}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PracticesPage;