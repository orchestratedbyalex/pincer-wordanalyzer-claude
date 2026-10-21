import React from 'react';
// External libs
import { Button, TextField, Typography } from '@material-ui/core';

// styles
import '../Results.css';
import { ISubmitWordForm } from '../../../../../interfaces/ISubmitWordForm';

const WORD_FIELD_ID = 'frecuencyWordTextField';

// component that renders frequency calculator widget
const SubmitWordForm: React.FunctionComponent<ISubmitWordForm> = (props: ISubmitWordForm) => {

    // local state to manage frecuency word
    return (
        <div className="frequencyWordForm">
            <Typography variant="overline" component="label" htmlFor={WORD_FIELD_ID} className="frequencyWordLabel">
                Word to find
            </Typography>
            <div className="frequencyWordInputWrapper">
                <TextField id={WORD_FIELD_ID} variant="outlined"
                    className="frequencyWordInput"
                    value={props.wordToCalculateFrequency}
                    autoComplete="off"
                    inputProps={{ 'aria-describedby': 'frequency-description' }}
                    onKeyDown={props.onKeyDown}
                    onChange={props.onChange} />
                <Button
                    variant="contained"
                    disabled={props.wordToCalculateFrequency.length === 0}
                    onClick={props.onSubmit}>
                    OK
                </Button>
            </div>
        </div>
    );
};


export default (SubmitWordForm);
