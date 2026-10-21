import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import WordAnalyzerApp from '../WordAnalyzerApp';

// jsdom has no matchMedia, so the rest of the suite runs with motion off. These tests turn
// motion on (or force reduced motion) themselves and remove the mock afterwards.
const setMedia = (reduce: boolean | null) => {
  if (reduce === null) { delete (window as any).matchMedia; return; }
  (window as any).matchMedia = (query: string) => ({
    matches: /reduce/.test(query) ? reduce : false, media: query, onchange: null,
    addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent() { return false; },
  });
};

// the text a screen reader gets: everything except aria-hidden subtrees
const accessibleText = (el: Element): string =>
  Array.from(el.childNodes).map((n) => (n.nodeType === 3 ? n.textContent || ''
    : (n as Element).getAttribute?.('aria-hidden') === 'true' ? '' : accessibleText(n as Element))).join('');

const inlineOpacities = () => Array.from(document.querySelectorAll<HTMLElement>('main [style]'))
  .map((e) => e.style.opacity).filter((o) => o !== '').map(Number);

const analyze = async (text: string) => {
  fireEvent.change(await screen.findByLabelText(/fill in your text/i), { target: { value: text } });
  fireEvent.click(screen.getByRole('button', { name: /analyze/i }));
  await screen.findByRole('button', { name: /start again/i }, { timeout: 4000 });
};

const calculate = (word: string) => {
  fireEvent.change(screen.getByLabelText(/word to find/i), { target: { value: word } });
  fireEvent.click(screen.getByRole('button', { name: 'OK' }));
};

afterEach(() => setMedia(null));

describe('motion', () => {
  test('motion on: entrances start and settle into the final state', async () => {
    setMedia(false);
    render(<WordAnalyzerApp />);
    await analyze('quiet house quiet quiet');

    expect(inlineOpacities().some((o) => o < 1)).toBe(true);

    await waitFor(() => {
      const rows = Array.from(document.querySelectorAll<HTMLElement>('nav [role="button"]'));
      expect(rows.length).toBeGreaterThan(0);
      rows.forEach((row) => expect(row.style.opacity === '' || Number(row.style.opacity) >= 1).toBe(true));
      const counts = Array.from(document.querySelectorAll('nav .indexCount')).map((c) => c.textContent);
      expect(counts).toContain('3');
    }, { timeout: 4000 });

    calculate('quiet');
    const status = await screen.findByRole('status');
    await waitFor(() => expect(status.querySelector('.frequencyCount')!.textContent).toBe('3'), { timeout: 4000 });
  });

  test('motion on: the live region only ever announces the final count', async () => {
    setMedia(false);
    render(<WordAnalyzerApp />);
    await analyze('quiet house quiet quiet quiet quiet quiet quiet quiet');
    calculate('quiet');
    const status = await screen.findByRole('status');

    for (let i = 0; i < 8; i++) {
      const said = accessibleText(status);
      expect(said).toMatch(/(^|\D)8(\D|$)/);
      expect(said).not.toMatch(/(^|\D)[0-7](\D|$)/);
      await new Promise((r) => setTimeout(r, 60));
    }
  });

  test('reduced motion: everything renders final on the first paint', async () => {
    setMedia(true);
    render(<WordAnalyzerApp />);
    await analyze('quiet house quiet');

    expect(inlineOpacities().every((o) => o >= 1)).toBe(true);
    const counts = Array.from(document.querySelectorAll('nav .indexCount')).map((c) => c.textContent);
    expect(counts).toContain('2');

    calculate('quiet');
    const status = await screen.findByRole('status');
    expect(status.querySelector('.frequencyCount')!.textContent).toBe('2');
    expect(screen.getByRole('button', { name: /motion/i })).toHaveAttribute('aria-pressed', 'false');
  });

  test('motion on: Start again keeps the results visible while they fade out', async () => {
    const text = 'quiet house kept the quiet hours';
    setMedia(false);
    render(<WordAnalyzerApp />);
    await analyze(text);

    fireEvent.click(screen.getByRole('button', { name: /start again/i }));

    // the outgoing results still hold their content during the exit
    expect(document.querySelector('.analyzedText')!.textContent).toContain(text);
    expect(document.querySelectorAll('nav [role="button"]').length).toBeGreaterThan(0);

    // and the form arrives empty once they have left
    const field = await screen.findByLabelText(/fill in your text/i, {}, { timeout: 4000 });
    expect(field).toHaveValue('');
    expect(screen.getByRole('button', { name: /analyze/i })).toBeDisabled();
  });

  test('the Motion toggle pauses the ribbon and the tint', async () => {
    setMedia(false);
    render(<WordAnalyzerApp />);
    const motion = await screen.findByRole('button', { name: /motion/i });
    expect(motion).toHaveAttribute('aria-pressed', 'true');
    expect(document.querySelector('[data-tint]')).toHaveAttribute('data-state', 'running');

    await analyze('apple apple pear plum plum plum');
    const ribbon = document.querySelector('[data-ribbon]') as HTMLElement;
    expect(ribbon).toHaveAttribute('aria-hidden', 'true');
    expect(ribbon).toHaveAttribute('data-state', 'running');
    expect(ribbon.querySelector('a, button, input, textarea, select, [tabindex]')).toBeNull();

    fireEvent.click(motion);
    expect(motion).toHaveAttribute('aria-pressed', 'false');
    expect(ribbon).toHaveAttribute('data-state', 'paused');
  });
});
