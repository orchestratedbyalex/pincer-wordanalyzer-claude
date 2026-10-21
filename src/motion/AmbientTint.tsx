import React from 'react';

import { useMotionPrefs } from './MotionContext';
import './Ambient.css';

// The single allowed gradient: a low-opacity blush and brass wash that drifts slowly
// behind the headline. Purely decorative.
const AmbientTint: React.FunctionComponent = () => {
    const { ambient } = useMotionPrefs();

    return <div className="ambientTint" data-tint aria-hidden="true" data-state={ambient ? 'running' : 'paused'} />;
};

export default AmbientTint;
