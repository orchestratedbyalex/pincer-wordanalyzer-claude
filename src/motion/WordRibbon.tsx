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

    if (words.length === 0) return null;

    // the sequence is rendered twice so the -50% loop is seamless
    const sequence = [...words, ...words];

    return (
        <div className="wordRibbon" data-ribbon aria-hidden="true" data-state={ambient ? 'running' : 'paused'}>
            <div className="wordRibbonTrack">
                {sequence.map((word, index) => (
                    <span className="wordRibbonWord" key={word + '_' + index}>{word}</span>
                ))}
            </div>
        </div>
    );
};

export default WordRibbon;
