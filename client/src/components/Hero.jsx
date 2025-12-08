import React from 'react';

const Hero = ({ title, subtitle, intro }) => {
  return (
    <section className="hero-section">
      <div className="container mx-auto px-4">
        <h2 className="hero-title">{title}</h2>
        <p className="hero-subtitle">{subtitle}</p>
        {intro && <p className="hero-intro mt-4 max-w-2xl mx-auto text-lg opacity-90">{intro}</p>}
      </div>
    </section>
  );
};

export default Hero;