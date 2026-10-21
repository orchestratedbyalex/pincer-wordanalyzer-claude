import React from 'react';
// External libs
import { ListItem } from '@material-ui/core';
import { motion } from 'framer-motion';

// interfaces
import { IWordFrequency } from '../../../../../lib/interfaces/IWordFrequency';

// motion
import CountUp from '../../../../../motion/CountUp';
import { EASE, useMotionPrefs } from '../../../../../motion/MotionContext';

// styles
import '../Results.css';

const ROMAN_NUMERALS: Array<[number, string]> = [
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

// ranks run from 1 to 100 (the top-words clamp), so C is the largest numeral needed
export const toRoman = (value: number): string => {
    let remaining = value;
    let numeral = '';
    for (const [amount, symbol] of ROMAN_NUMERALS) {
        while (remaining >= amount) {
            numeral += symbol;
            remaining -= amount;
        }
    }
    return numeral;
}

// Rows cascade after their section rule has started drawing. Ranks past the cap share the
// last delay, so the slowest row ends by 0.45 + 0.45 = 0.9s, its leader by 0.45 + 0.05 + 0.5
// = 1.0s and its count by 0.45 + 0.05 + 0.55 = 1.05s, inside R-13's 1.2s budget.
const ROW_DURATION = 0.45;
const LEADER_DURATION = 0.5;
const COUNT_DURATION = 0.55;
const FOLLOW_GAP = 0.05;
const rowDelay = (rank: number): number => 0.15 + Math.min(rank - 1, 6) * 0.05;

interface IIndexEntry {
    rank: number;
    word: IWordFrequency;
    onSelect: (word: string) => void;
}

// one line of a printed index: rank numeral, word, dotted leader, count
const IndexEntry: React.FunctionComponent<IIndexEntry> = ({ rank, word, onSelect }: IIndexEntry) => {
    const { entrances } = useMotionPrefs();
    const delay = rowDelay(rank);
    // the motion props travel through ListItem and ButtonBase to the motion.div root
    const motionProps: any = {
        initial: entrances ? { opacity: 0, y: 10 } : false,
        animate: { opacity: 1, y: 0 },
        transition: { duration: ROW_DURATION, delay, ease: EASE },
    };

    return (
        <ListItem
            button
            component={motion.div as any}
            className="indexEntry"
            aria-label={`${word.getWord()}, ${word.getFrequency()} occurrences`}
            onClick={() => onSelect(word.getWord())}
            {...motionProps}>
            <span className="indexRank">{toRoman(rank)}.</span>
            <span className="indexWord">{word.getWord()}</span>
            <motion.span
                className="indexLeader"
                aria-hidden="true"
                initial={entrances ? { scaleX: 0 } : false}
                animate={{ scaleX: 1 }}
                transition={{ duration: LEADER_DURATION, delay: delay + FOLLOW_GAP, ease: EASE }} />
            <CountUp
                className="indexCount"
                value={word.getFrequency()}
                delay={delay + FOLLOW_GAP}
                duration={COUNT_DURATION}
                announce={false} />
        </ListItem>
    );
};

export default IndexEntry;
