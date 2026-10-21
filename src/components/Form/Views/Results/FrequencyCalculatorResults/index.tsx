import React from 'react';
// External libs
import { Typography } from '@material-ui/core';
import { motion } from 'framer-motion';

// motion
import CountUp from '../../../../../motion/CountUp';
import { EASE, useMotionPrefs } from '../../../../../motion/MotionContext';

// styles
import '../Results.css';
import { IFrequencyCalculatorResults } from '../../../../../interfaces/IFrequencyCalculatorResults';

// the image URL comes from a third-party API: only plain https URLs are rendered
const isSafeImageUrl = (url: string): boolean => /^https:\/\//i.test(url);

// component that renders frequency calculator widget results
const FrequencyCalculatorResults: React.FunctionComponent<IFrequencyCalculatorResults> = (props: IFrequencyCalculatorResults) => {

    const { entrances } = useMotionPrefs();
    // an image that fails to load falls back to the word, as the old avatar did
    const [failedImageUrl, setFailedImageUrl] = React.useState<string>('');
    const showImage: boolean = isSafeImageUrl(props.wordAsImageUrl) && failedImageUrl !== props.wordAsImageUrl;

    return (
        <div className="calculatedFrequencyDetails" role="status" aria-live="polite">
            <div className="resultsTextWrapper">
                <Typography variant="overline" component="span">
                    found
                </Typography>
                <CountUp className="frequencyCount" value={props.calculatedFrequency ?? 0} />
                <Typography variant="overline" component="span">
                    time(s)
                </Typography>
            </div>
            <motion.figure
                className="wordPlate"
                initial={entrances ? { opacity: 0, y: 8 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: EASE }}>
                {showImage ?
                    <img
                        className="wordPlateImage"
                        alt={props.wordToCalculateFrequency}
                        src={props.wordAsImageUrl}
                        onError={() => setFailedImageUrl(props.wordAsImageUrl)} />
                    :
                    <span className="wordPlateFallback">{props.wordToCalculateFrequency.toUpperCase()}</span>
                }
                {showImage &&
                    <Typography variant="overline" component="figcaption" className="wordPlateCaption">
                        Image result for {props.wordToCalculateFrequency}
                    </Typography>}
            </motion.figure>
        </div>
    );
};


export default (FrequencyCalculatorResults);
