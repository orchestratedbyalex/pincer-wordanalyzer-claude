import React from 'react';
//External libs
import { List, TextField, Typography } from '@material-ui/core';
import { connect } from 'react-redux';

// local libs
import { WordFrequencyAnalyzer } from '../../../../../lib';

// local components
import IndexEntry from '../IndexEntry';

//redux
import { calculateFrequency, clearFrequencyState, setWordToCalculateFrequency } from '../../../../../redux/actions/form';

// styles
import '../Results.css';

//interfaces
import { ITopWords } from '../../../../../interfaces/ITopWords';
import { IWordFrequency } from '../../../../../lib/interfaces/IWordFrequency';

const wordFrequencyAnalyzer: WordFrequencyAnalyzer = new WordFrequencyAnalyzer();

const normalizeTopNumberOfWords = (value: string): number => {
    const parsedValue = Number(value);

    if (!Number.isFinite(parsedValue)) return 1;

    return Math.min(100, Math.max(1, Math.floor(parsedValue)));
}

// dispatch redux actions when clicking a word for frequency calculation and display as highlighted
const onClickListItem = (wordToCalculate: string, dispatch: any) => {
    dispatch(clearFrequencyState());
    dispatch(setWordToCalculateFrequency(wordToCalculate));
    dispatch(calculateFrequency());
}

const TopWords: React.FunctionComponent<ITopWords> = (props: ITopWords) => {

    const [topNumberOfWords, setTopNumberOfWords] = React.useState<number>(3);

    const wordFrequencyArray: IWordFrequency[] = wordFrequencyAnalyzer.calculateMostFrequentNWords(props.text, topNumberOfWords);

    return (
        <section className="detailsWrapper" aria-labelledby="top-words-heading">
            <Typography id="top-words-heading" variant="h3" component="h3" className="detailsTitle">
                Top words
            </Typography>
            <div className="topWordsControl">
                <Typography variant="overline" component="span">Show</Typography>
                <TextField
                    autoComplete="off"
                    className="topWordsAmountTextField"
                    id="topWordsTextField"
                    value={topNumberOfWords}
                    onChange={(ev) => setTopNumberOfWords(normalizeTopNumberOfWords(ev.target.value))}
                    inputProps={{
                        max: 100,
                        min: 1,
                        'aria-label': 'Number of top words',
                    }}
                    type="number"
                    variant="outlined"
                />
                <Typography variant="overline" component="span">words</Typography>
            </div>
            <List
                component="nav"
                aria-labelledby="top-words-heading"
                className="resultList"
            >
                {
                    wordFrequencyArray.map((word, index) => (
                        <IndexEntry
                            key={word.getWord() + "_" + word.getFrequency() + "__li"}
                            rank={index + 1}
                            word={word}
                            onSelect={(selected) => onClickListItem(selected, props.dispatch)} />
                    ))
                }
            </List>
        </section>
    );
};


const mapStateToProps = (state: any) => ({ text: state.form.text });

export default connect(mapStateToProps)(TopWords);
