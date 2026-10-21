import React from 'react';
import { render, screen } from '@testing-library/react';
import Masthead from './index';

describe('<Masthead />', () => {
  test('shows the wordmark h1 and the byline in one header, with no canvas', () => {
    const { container } = render(<Masthead />);

    const heading = screen.getByRole('heading', { level: 1, name: 'The WordAnalyzer' });
    expect(heading).toBeVisible();
    expect(heading.style.opacity).toBe('');
    expect(heading.closest('header')).toHaveTextContent('Showcase by Alexander Gomez');
    expect(container.querySelector('canvas')).toBeNull();
  });
});
