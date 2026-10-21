import React from 'react';
// External libs
import { Button, Typography } from '@material-ui/core';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';
//local components
import TextInput from '../../../TextInput';
// enumos
import { FormView } from '../../../../enums/FormView';
//redux
import { clearFrequencyState, setFormView, setText } from '../../../../redux/actions/form';
// interfaces
import { IDefaultView } from '../../../../lib/interfaces/IDefaultView';
// motion
import { EASE, useMotionPrefs } from '../../../../motion/MotionContext';
//styles
import './Default.css';
import { WordFrequencyAnalyzerHelper } from '../../../../lib/WordFrecuencynalyzerHelper';

// clean state - move to results view
const cleanFrequencyStateAndGoToResultsView = (dispatch: any) => {
    dispatch(clearFrequencyState());
    dispatch(setFormView(FormView.RESULTS_VIEW));
}

const wordFrequencyAnalyzerHelper: WordFrequencyAnalyzerHelper = new WordFrequencyAnalyzerHelper();

const HEADLINE_WORDS = ['See', 'what', 'stands', 'out.'];
const WORD_STAGGER = 0.08;

// component that renders main input text form
const DefaultView: React.FunctionComponent<IDefaultView> = (props: IDefaultView) => {

    const totalAmountOfWords: number = wordFrequencyAnalyzerHelper.countWordsInText(props.text);
    const isAnalizedButtonEnabled: boolean = totalAmountOfWords > 0;
    const { entrances } = useMotionPrefs();
    // the rest of the page follows once the headline has mostly risen
    const followDelay = HEADLINE_WORDS.length * WORD_STAGGER + 0.2;

    return (
        <motion.section
            aria-labelledby="input-view-title"
            initial={entrances ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            exit={entrances ? { opacity: 0, y: -8, transition: { duration: 0.24, ease: EASE } } : undefined}
            transition={{ duration: 0.3, ease: EASE }}
            className='defaultView'>
            <div className="defaultViewHeader">
                <Typography id="input-view-title" variant="h2" component="h2" className="defaultViewTitle">
                    {HEADLINE_WORDS.map((word, index) => (
                        <React.Fragment key={word}>
                            <motion.span
                                className="headlineWord"
                                initial={entrances ? { opacity: 0, y: '0.45em' } : false}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: index * WORD_STAGGER, ease: EASE }}>
                                {word}
                            </motion.span>
                            {index < HEADLINE_WORDS.length - 1 && ' '}
                        </React.Fragment>
                    ))}
                </Typography>
                <motion.div
                    initial={entrances ? { opacity: 0, y: 10 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: followDelay, ease: EASE }}>
                    <Typography variant="body1" component="p" className="defaultViewDescription">
                        Add any passage to reveal its most frequent words and explore them in context.
                    </Typography>
                </motion.div>
            </div>
            <motion.div
                className="defaultViewForm"
                initial={entrances ? { opacity: 0, y: 14 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: followDelay + 0.1, ease: EASE }}>
                <TextInput onTextChange={(newText: string) => props.dispatch && props.dispatch(setText(newText))} />
                <div className="analyzeActionWrapper">
                    <Button
                        disabled={!isAnalizedButtonEnabled}
                        variant="contained"
                        size="large"
                        className="analyzeButton"
                        onClick={() => props.dispatch && cleanFrequencyStateAndGoToResultsView(props.dispatch)}>
                        Analyze
                        <span className="analyzeArrow" aria-hidden="true">→</span>
                    </Button>
                </div>
            </motion.div>
        </motion.section>
    );
};

// redux state to props
const mapStateToProps = (state: any) => ({ text: state.form.text });

export default connect(mapStateToProps)(DefaultView);
