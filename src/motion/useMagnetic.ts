import React from 'react';
import { useMotionValue, useSpring, MotionValue } from 'framer-motion';

import { useMotionPrefs } from './MotionContext';

const MAX_PULL = 6;
const PULL = 0.15;
// critically damped, so the button glides and never bounces
const SPRING = { stiffness: 300, damping: 30 };

const finePointer = (): boolean =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(pointer: fine)').matches;

const clamp = (value: number): number => Math.max(-MAX_PULL, Math.min(MAX_PULL, value));

interface IMagnetic {
    x: MotionValue<number>;
    y: MotionValue<number>;
    onMouseMove: (event: React.MouseEvent) => void;
    onMouseLeave: () => void;
}

// Leans an element toward the pointer by at most 6px, for fine pointers with ambient motion on.
export const useMagnetic = (target: React.RefObject<HTMLElement>): IMagnetic => {
    const { ambient } = useMotionPrefs();
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const x = useSpring(rawX, SPRING);
    const y = useSpring(rawY, SPRING);

    const reset = React.useCallback(() => { rawX.set(0); rawY.set(0); }, [rawX, rawY]);

    React.useEffect(() => { if (!ambient) reset(); }, [ambient, reset]);

    const onMouseMove = (event: React.MouseEvent) => {
        if (!ambient || !finePointer() || !target.current) return;
        const box = target.current.getBoundingClientRect();
        rawX.set(clamp((event.clientX - (box.left + box.width / 2)) * PULL));
        rawY.set(clamp((event.clientY - (box.top + box.height / 2)) * PULL));
    };

    return { x, y, onMouseMove, onMouseLeave: reset };
};
