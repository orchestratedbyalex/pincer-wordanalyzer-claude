import React from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

// Motion is allowed only when the browser can report the preference and it is not "reduce".
// Without matchMedia (old browsers, jsdom) everything renders in its final state.
const motionAllowed = (): boolean =>
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    !window.matchMedia(REDUCED_MOTION_QUERY).matches;

export interface IMotionPrefs {
    // one-shot entrances: staggers, draws, count-ups, view cross-fades
    entrances: boolean;
    // looping ambient motion; also follows the visitor's Motion toggle
    ambient: boolean;
    setAmbient: (on: boolean) => void;
}

const MotionContext = React.createContext<IMotionPrefs>({
    entrances: false,
    ambient: false,
    setAmbient: () => undefined,
});

export const MotionProvider: React.FunctionComponent = ({ children }) => {
    const [allowed, setAllowed] = React.useState<boolean>(motionAllowed);
    // the visitor's choice for this visit only; it starts on, gated by `allowed`
    const [ambientChoice, setAmbientChoice] = React.useState<boolean>(true);

    React.useEffect(() => {
        if (typeof window.matchMedia !== 'function') return;
        const query = window.matchMedia(REDUCED_MOTION_QUERY);
        const onChange = () => setAllowed(!query.matches);
        if (typeof query.addEventListener === 'function') {
            query.addEventListener('change', onChange);
            return () => query.removeEventListener('change', onChange);
        }
        query.addListener(onChange);
        return () => query.removeListener(onChange);
    }, []);

    const value = React.useMemo<IMotionPrefs>(() => ({
        entrances: allowed,
        ambient: allowed && ambientChoice,
        setAmbient: setAmbientChoice,
    }), [allowed, ambientChoice]);

    return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
};

export const useMotionPrefs = (): IMotionPrefs => React.useContext(MotionContext);

// the one easing curve used everywhere: a long, calm ease-out
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
