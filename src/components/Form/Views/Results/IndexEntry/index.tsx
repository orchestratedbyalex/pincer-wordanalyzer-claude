import React from 'react';
// External libs
import { ListItem } from '@material-ui/core';

// interfaces
import { IWordFrequency } from '../../../../../lib/interfaces/IWordFrequency';

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

interface IIndexEntry {
    rank: number;
    word: IWordFrequency;
    onSelect: (word: string) => void;
}

// one line of a printed index: rank numeral, word, dotted leader, count
const IndexEntry: React.FunctionComponent<IIndexEntry> = ({ rank, word, onSelect }: IIndexEntry) => (
    <ListItem
        button
        className="indexEntry"
        aria-label={`${word.getWord()}, ${word.getFrequency()} occurrences`}
        onClick={() => onSelect(word.getWord())}>
        <span className="indexRank">{toRoman(rank)}.</span>
        <span className="indexWord">{word.getWord()}</span>
        <span className="indexLeader" aria-hidden="true" />
        <span className="indexCount">{word.getFrequency()}</span>
    </ListItem>
);

export default IndexEntry;
