import React from 'react';
import { animate } from 'framer-motion';

import { EASE, useMotionPrefs } from './MotionContext';

interface ICountUp {
    value: number;
    className?: string;
    delay?: number;
    // false when the surrounding element already names the value (e.g. an aria-label)
    announce?: boolean;
}

// A number that ticks up from 0. The ticking copy is aria-hidden; screen readers and
// live regions only ever get the final value from the visually hidden copy.
const CountUp: React.FunctionComponent<ICountUp> = ({ value, className, delay = 0, announce = true }: ICountUp) => {
    const { entrances } = useMotionPrefs();
    const [shown, setShown] = React.useState<number>(entrances ? 0 : value);

    React.useEffect(() => {
        if (!entrances) {
            setShown(value);
            return;
        }
        const controls = animate(0, value, {
            duration: 0.8,
            delay,
            ease: EASE,
            onUpdate: (latest) => setShown(Math.round(latest)),
        });
        return () => controls.stop();
    }, [entrances, value, delay]);

    return (
        <>
            <span className={className} aria-hidden="true">{shown}</span>
            {announce && <span className="visually-hidden">{value}</span>}
        </>
    );
};

export default CountUp;
