import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../components/ThemeToggle';

describe('ThemeToggle Component', () => {
    it('renders theme toggle button', () => {
        render(<ThemeToggle />);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });

    it('toggles theme when clicked', () => {
        render(<ThemeToggle />);
        const button = screen.getByRole('button');
        
        const initialIcon = button.textContent;
        fireEvent.click(button);
        const newIcon = button.textContent;
        
        expect(initialIcon).not.toBe(newIcon);
    });

    it('saves theme preference to localStorage', () => {
        const localStorageMock = {
            getItem: vi.fn(),
            setItem: vi.fn(),
        };
        global.localStorage = localStorageMock;

        render(<ThemeToggle />);
        const button = screen.getByRole('button');
        
        fireEvent.click(button);
        
        expect(localStorageMock.setItem).toHaveBeenCalled();
    });
});
