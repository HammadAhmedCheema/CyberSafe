import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Hero from '../components/Hero';

describe('Hero Component', () => {
    it('renders title and subtitle correctly', () => {
        render(
            <BrowserRouter>
                <Hero title="Test Title" subtitle="Test Subtitle" />
            </BrowserRouter>
        );

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    });

    it('renders intro text when provided', () => {
        render(
            <BrowserRouter>
                <Hero 
                    title="Test Title" 
                    subtitle="Test Subtitle" 
                    intro="Test intro text"
                />
            </BrowserRouter>
        );

        expect(screen.getByText('Test intro text')).toBeInTheDocument();
    });

    it('does not render intro when not provided', () => {
        const { container } = render(
            <BrowserRouter>
                <Hero title="Test Title" subtitle="Test Subtitle" />
            </BrowserRouter>
        );

        const introElement = container.querySelector('.hero-intro');
        expect(introElement).not.toBeInTheDocument();
    });
});
