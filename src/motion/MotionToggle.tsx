import React from 'react';

import { useMotionPrefs } from './MotionContext';
import './Ambient.css';

// Pauses all looping ambient motion (WCAG 2.2.2). Under reduced motion it stays off and
// says why, since the system preference wins.
const MotionToggle: React.FunctionComponent = () => {
    const { entrances, ambient, setAmbient } = useMotionPrefs();
    const lockedOff = !entrances;

    return (
        <>
            <button
                type="button"
                className="motionToggle"
                data-corner="control"
                aria-pressed={ambient}
                aria-disabled={lockedOff || undefined}
                aria-describedby={lockedOff ? 'motion-toggle-note' : undefined}
                onClick={() => { if (!lockedOff) setAmbient(!ambient); }}>
                <span className="motionToggleDot" data-on={ambient} aria-hidden="true" />
                Motion
            </button>
            {/* outside the button so it describes it without becoming part of its name */}
            {lockedOff &&
                <span id="motion-toggle-note" className="visually-hidden">
                    Off because your system asks for reduced motion
                </span>}
        </>
    );
};

export default MotionToggle;
