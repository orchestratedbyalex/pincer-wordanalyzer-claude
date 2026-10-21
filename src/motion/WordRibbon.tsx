import React from 'react';

import { WordFrequencyAnalyzer } from '../lib';
import { useMotionPrefs } from './MotionContext';
import './Ambient.css';

const wordFrequencyAnalyzer: WordFrequencyAnalyzer = new WordFrequencyAnalyzer();
const RIBBON_WORDS = 8;

// A slow, decorative ribbon of the text's top words. It is aria-hidden and holds nothing
// focusable; the words are plain React text nodes, already extracted from the input.
const WordRibbon: React.FunctionComponent<{ text: string }> = ({ text }) => {
    const { ambient } = useMotionPrefs();
    const words = wordFrequencyAnalyzer.calculateMostFrequentNWords(text, RIBBON_WORDS).map((w) => w.getWord());
    const ribbonRef = React.useRef<HTMLDivElement>(null);
    const copyRef = React.useRef<HTMLSpanElement>(null);
    // how many times the word set repeats inside one copy, so one copy covers the ribbon
    const [repeats, setRepeats] = React.useState<number>(1);

    React.useLayoutEffect(() => {
        const measure = () => {
            const ribbon = ribbonRef.current;
            const copy = copyRef.current;
            if (!ribbon || !copy) return;
            const oneSet = copy.scrollWidth / repeats;
            // nothing measurable (e.g. jsdom): keep a single set
            if (oneSet <= 0) return;
            const needed = Math.max(1, Math.ceil(ribbon.clientWidth / oneSet));
            if (needed !== repeats) setRepeats(needed);
        };
        measure();
        // the italic face loads lazily and swaps in narrower than its fallback, so watch the
        // copy's size (and the ribbon's) rather than only the window
        if (typeof ResizeObserver === 'function') {
            const observer = new ResizeObserver(measure);
            if (ribbonRef.current) observer.observe(ribbonRef.current);
            if (copyRef.current) observer.observe(copyRef.current);
            return () => observer.disconnect();
        }
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, [repeats, text]);

    if (words.length === 0) return null;

    const copy = Array.from({ length: repeats }, () => words).flat();
    const renderCopy = (ref?: React.Ref<HTMLSpanElement>) => (
        <span className="wordRibbonCopy" ref={ref}>
            {copy.map((word, index) => <span className="wordRibbonWord" key={word + '_' + index}>{word}</span>)}
        </span>
    );

    // two identical copies make the -50% loop seamless
    return (
        <div ref={ribbonRef} className="wordRibbon" data-ribbon aria-hidden="true" data-state={ambient ? 'running' : 'paused'}>
            <div className="wordRibbonTrack">
                {renderCopy(copyRef)}
                {renderCopy()}
            </div>
        </div>
    );
};

export default WordRibbon;
