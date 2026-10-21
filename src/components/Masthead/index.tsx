import React from 'react';
import { Typography } from '@material-ui/core';

import './Masthead.css';

// Typographic masthead: the wordmark is the page's h1, the byline sits opposite it,
// and a hairline rule closes the row.
const Masthead: React.FunctionComponent = () => (
    <header className="masthead">
        <Typography variant="h1" component="h1" className="mastheadWordmark">
            The WordAnalyzer
        </Typography>
        <Typography variant="overline" component="p" className="mastheadByline">
            Showcase by Alexander Gomez
        </Typography>
    </header>
);

export default Masthead;
