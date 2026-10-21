import React from 'react';

//External libs
import { Button, Typography } from '@material-ui/core';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import Highlighter from "react-highlight-words";

// local libs
import { WordFrequencyAnalyzerHelper } from '../../../../lib/WordFrecuencynalyzerHelper';
import HighestFrecuencyWords from './HighestFrecuencyWords';

// local components
import TopWords from './TopWords';
import FrequencyCalculator from './FrequencyCalculator';

// redux
import { clearTexxt, setFormView } from '../../../../redux/actions/form';

// constants
import { FormView } from '../../../../enums/FormView';

// interfaces
import { IResultsView } from '../../../../interfaces/IResultsView';

// motion
import { EASE, useMotionPrefs } from '../../../../motion/MotionContext';
import WordRibbon from '../../../../motion/WordRibbon';

// styles
import './Results.css';
import { IHighligherProps } from '../../../../interfaces/IHighligherProps';

const wordFrequencyAnalyzerHelper: WordFrequencyAnalyzerHelper = new WordFrequencyAnalyzerHelper();


const cleanStateAndGoToDefaultView = (dispatch: any) => {
    dispatch(clearTexxt());
    dispatch(setFormView(FormView.DEFAULT_VIEW));
}

const setHighlighterTextProps = (props: IResultsView): IHighligherProps => {
    // add extra spaces to simulate handlighted effect
    let textToHighlight = " " + props.text + " ";
    return { textToHighlight };
}

// component that contains rendered text and calculation widgets
const ResultsView: React.FunctionComponent<IResultsView> = (props: IResultsView) => {
    const { entrances } = useMotionPrefs();

    return (
        <motion.section
            aria-labelledby="results-title"
            initial={entrances ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={entrances ? { opacity: 0, y: -8, transition: { duration: 0.24, ease: EASE } } : undefined}
            transition={{ duration: 0.4, ease: EASE }}
            className='resultsContainer'>
            {/* kept for screen readers so the page outline stays intact; not shown on screen */}
            <h2 id="results-title" className="visually-hidden">Your word profile</h2>

            <section className="sourceText" aria-labelledby="source-text-title">
                <Typography id="source-text-title" variant="overline" component="h3" className="sourceTextTitle">
                    Analyzed text
                </Typography>
                <div
                    className="analyzedText"
                    data-motion={entrances ? 'on' : 'off'}
                    tabIndex={0}
                    aria-label="Analyzed text with selected words highlighted">
                    {/* keyed by the selection so the marks remount and the sweep replays each time */}
                    <Highlighter
                        key={props.wordToCalculateFrequency}
                        highlightClassName="YourHighlightClass"
                        searchWords={wordFrequencyAnalyzerHelper.getHighlightedWordsInText(props.text, props.wordToCalculateFrequency)}
                        autoEscape={true}
                        caseSensitive={true}
                        textToHighlight={setHighlighterTextProps(props).textToHighlight}
                    />
                </div>
            </section>
            <WordRibbon text={props.text} />
            <div className="detailedResultsWrapper">
                <TopWords />
                <HighestFrecuencyWords />
                <FrequencyCalculator />
            </div>
            <div className="startAgainButtonWraper">
                <Button
                    variant="outlined"
                    size="large"
                    onClick={() => props.dispatch && cleanStateAndGoToDefaultView(props.dispatch)}>
                    Start again
                </Button>
            </div>
        </motion.section>
    );
};


const mapStateToProps = (state: any) => ({
    text: state.form.text,
    wordToCalculateFrequency: state.form.wordToCalculateFrequency
});

export default connect(mapStateToProps)(ResultsView);
