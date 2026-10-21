import React from 'react';
import { Typography } from '@material-ui/core';

import MotionToggle from '../../motion/MotionToggle';

import './Masthead.css';

// Typographic masthead: the wordmark is the page's h1, the Motion toggle sits opposite it,
// and a hairline rule closes the row.
const Masthead: React.FunctionComponent = () => (
    <header className="masthead">
        <Typography variant="h1" component="h1" className="mastheadWordmark">
            The WordAnalyzer
        </Typography>
        <MotionToggle />
    </header>
);

export default Masthead;
