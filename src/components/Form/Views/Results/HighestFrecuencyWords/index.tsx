import { List, Typography } from '@material-ui/core';
import React from 'react';

// external libs
import { connect } from 'react-redux';

//local libs
import { WordFrequencyAnalyzerHelper } from '../../../../../lib/WordFrecuencynalyzerHelper';

// local components
import IndexEntry from '../IndexEntry';
import SectionRule from '../../../../../motion/SectionRule';

// interfaces
import { IWordFrequency } from '../../../../../lib/interfaces/IWordFrequency';


//styles
import '../Results.css';
import { IHighestFrequencyWords } from '../../../../../interfaces/IHighestFrequencyWords';
import { calculateFrequency, clearFrequencyState, setWordToCalculateFrequency } from '../../../../../redux/actions/form';

const wordFrequencyAnalyzerHelper: WordFrequencyAnalyzerHelper = new WordFrequencyAnalyzerHelper();

// dispatch redux actions when clicking a word for frequency calculation and display as highlighted
const onClickListItem = (wordToCalculate: string, dispatch: any) => {
    dispatch(clearFrequencyState());
    dispatch(setWordToCalculateFrequency(wordToCalculate));
    dispatch(calculateFrequency());
}

// component that renders the highest frequency words widget
const HighestFrequencyWords: React.FunctionComponent<IHighestFrequencyWords> = (props: IHighestFrequencyWords) => {

    const mostFrequentWords: IWordFrequency[] = wordFrequencyAnalyzerHelper.getMostFrecuentWordsFromText(props.text);

    return (
        <section className="detailsWrapper" aria-labelledby="highest-words-heading">
            <SectionRule delay={0.08} />
            <Typography id="highest-words-heading" variant="h3" component="h3" className="detailsTitle">
                Highest frequency
            </Typography>
            <List
                component="nav"
                aria-labelledby="highest-words-heading"
                className="resultList" >
                {
                    mostFrequentWords.map((word, index) => (
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

export default connect(mapStateToProps)(HighestFrequencyWords);
