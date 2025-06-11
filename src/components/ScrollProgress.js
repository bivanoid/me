'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRef, useLayoutEffect, useState } from 'react';

const DEFAULT_SPRING_OPTIONS = {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
};

export function ScrollProgress({ className, springOptions, containerRef }) {
    const [hasLayout, setHasLayout] = useState(false);

    useLayoutEffect(() => {
        if (containerRef?.current) {
            setHasLayout(true);
        }
    }, [containerRef]);

    const { scrollYProgress } = useScroll({
        container: containerRef,
        layoutEffect: hasLayout,
    });

    const scaleX = useSpring(scrollYProgress, {
        ...DEFAULT_SPRING_OPTIONS,
        ...(springOptions || {}),
    });

    return (
        <motion.div
            className={cn('inset-x-0 top-0 h-1 origin-left fixed z-50 bg-blue-500', className)}
            style={{ scaleX }}
        />
    );
}
