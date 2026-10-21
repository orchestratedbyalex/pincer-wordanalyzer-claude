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

// rows cascade after their section rule has started drawing; the stagger is capped so a
// long list still settles within the 1.2s budget
const rowDelay = (rank: number): number => 0.25 + Math.min(rank - 1, 8) * 0.06;

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
        transition: { duration: 0.5, delay, ease: EASE },
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
                transition={{ duration: 0.6, delay: delay + 0.1, ease: EASE }} />
            <CountUp className="indexCount" value={word.getFrequency()} delay={delay + 0.1} announce={false} />
        </ListItem>
    );
};

export default IndexEntry;
