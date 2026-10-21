import React from 'react';
import { motion } from 'framer-motion';

import { EASE, useMotionPrefs } from './MotionContext';

// The oxblood rule above a results section; it draws from left to right on entrance.
const SectionRule: React.FunctionComponent<{ delay?: number }> = ({ delay = 0 }) => {
    const { entrances } = useMotionPrefs();

    return (
        <motion.span
            data-rule
            aria-hidden="true"
            className="sectionRule"
            initial={entrances ? { scaleX: 0 } : false}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay, ease: EASE }} />
    );
};

export default SectionRule;
