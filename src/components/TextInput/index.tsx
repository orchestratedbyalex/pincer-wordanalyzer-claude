import React from 'react';

// External libs
import { TextField } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';

// Local libs
import { WordFrequencyAnalyzerHelper } from '../../lib/WordFrecuencynalyzerHelper';

// Interfaces
import { ITextInput } from '../../interfaces/ITextInput';

// Styles
import './TextInput.css';


const wordFrequencyAnalyzerHelper: WordFrequencyAnalyzerHelper = new WordFrequencyAnalyzerHelper();

const TEXT_FIELD_ID = 'word-analyzer-text-field';

// component used to fill in word to calculate frequency
const TextInput: React.FunctionComponent<ITextInput> = (props: ITextInput) => {

    const totalAmountOfWords: number = wordFrequencyAnalyzerHelper.countWordsInText(props.text);
    const wordCountLabel = `${totalAmountOfWords} ${totalAmountOfWords === 1 ? 'word' : 'words'}`;

    return (
        <div className='textInputWrapper'>
            {/* a static label above the field instead of MUI's floating one */}
            <Typography variant="overline" component="label" htmlFor={TEXT_FIELD_ID} className="textInputLabel">
                Fill in your text…
            </Typography>
            <TextField
                autoComplete="off"
                className="textInput"
                fullWidth
                id={TEXT_FIELD_ID}
                multiline
                minRows={6}
                maxRows={14}
                onChange={(ev) => props.onTextChange(ev.target.value)}
                defaultValue={String(props.text)}
                inputProps={{ 'aria-describedby': 'word-counter' }}
                variant="outlined"
            />
            <Typography
                id="word-counter"
                variant="overline"
                className='wordCounterParagraph'
                component="p"
                aria-live="polite"
                aria-atomic="true">
                {wordCountLabel}
            </Typography>
        </div>
    );
};

const mapStateToProps = (state: any) => ({ text: state.form.text });

export default connect(mapStateToProps)(TextInput);
