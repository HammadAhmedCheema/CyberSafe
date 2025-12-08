import React from 'react';
import Hero from '../components/Hero';
import data from '../data/db.json';
import quishing from '../assets/quishing.mp4';

const ResourcesPage = () => {
    const { hero, downloadable, additional } = data.resources;

    return (
        <div>
            <Hero title={hero.title} subtitle={hero.subtitle} />
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="downloadable-grid">
                        {downloadable.map((item, index) => (
                            <article key={index} className="resource-card">
                                <div>
                                    <h3 className="resource-title">{item.title}</h3>
                                    <p className="resource-description">{item.description}</p>
                                </div>

                                <a href={`/assets/pdfs/${item.file}`} download className="download-button">
                                    Download PDF
                                </a>
                            </article>
                        ))}
                    </div>

                    <div className="video-section">
                        <h3 className="video-title">Training Video</h3>
                        <div className="video-container">
                            <video 
                                controls 
                                className="training-video"
                                preload="metadata"
                            >
                                <source src={quishing} type="video/mp4" />
                            </video>
                            <p className="video-caption">
                                Click the play button to start the training video
                            </p>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="additional-title">Additional Online Resources</h3>
                         <div className="additional-grid">
                            {additional.map((item, index) => (
                                <div key={index} className="additional-card">
                                    <h4 className="additional-item-title">{item.title}</h4>
                                    <p className="additional-item-text">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ResourcesPage;