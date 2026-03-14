import React from 'react';

const Hero = ({ title, subtitle, intro }) => {
  return (
    <section className="hero-section">
      <div className="container animate-in">
        <h2 className="hero-title">{title}</h2>
        <p className="hero-subtitle">{subtitle}</p>
        {intro && (
          <div className="mt-8 glass-card max-w-2xl mx-auto py-4 px-6 border-glow-blue">
            <p className="text-sm md:text-base text-gray-400 font-mono tracking-tight">
              <span className="text-neon mr-2">$</span> {intro}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;