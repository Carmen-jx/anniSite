import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import "../style/FloatingImg.css";

const preloadImages = (images) => {
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

export default function FloatingImg({ images,
density = 1,
minSize = 64,
maxSize = 128,
minSpeed = 12,
maxSpeed = 24,
className = "",
movement = "wander"
}) {

    const containerRef = useRef(null);
    const [containerHeight, setContainerHeight] = useState(400);

    useEffect(() => {
        preloadImages(images);
    }, [images]);

    useLayoutEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => setContainerHeight(el.clientHeight));
        ro.observe(el);
        return () => ro.disconnect();
        }, []);


    const imgs = useMemo(() => {
        const expandedImages = [];
        const totalDensity = Math.ceil(density * 1.5);
        
        for (let i = 0; i < totalDensity; i++) {
            images.forEach(img => {
                if (Math.random() > 0.3) { 
                    expandedImages.push(img);
                }
            });
        }
        
        const shuffled = expandedImages
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);

        return shuffled.map((src, index) => {
            const sizeNoise = Math.random() * Math.random() * (maxSize - minSize);
            const size = minSize + sizeNoise;
            const speedVariance = Math.random() * 1.5 + 0.5; // 0.5 to 2.0
            const speed = minSpeed + (maxSpeed - minSpeed) * speedVariance;
            return { 
                src, 
                size, 
                speed, 
                index,
                id: `${index}-${Date.now()}${Math.random()}`
            };
        });
    }, [images, density, minSize, maxSize, minSpeed, maxSpeed]);

    const floaters = useMemo(() => {
        return imgs.map((it, idx) => (
            <Floater
                key={it.id}
                src={it.src}
                containerHeight={containerHeight}
                minSize={minSize}
                maxSize={maxSize}
                minSpeed={minSpeed}
                maxSpeed={maxSpeed}
                laneIndex={idx}
                movement={movement}
            />
        ));
    }, [imgs, containerHeight, minSize, maxSize, minSpeed, maxSpeed, movement]);

    return (
        <div ref={containerRef} className={`floating-img ${className}`}>
            <div className="floating-img-bg" />
            {floaters}
        </div>
    );
}

function Floater({ src, containerHeight, minSize, maxSize, minSpeed, maxSpeed, laneIndex }) {
    // Use Math.random() directly for more randomness
    const rand = (a, b) => a + (b - a) * Math.random();
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const size = Math.round(rand(minSize, maxSize));
    const [startx, endx] = pick([ ["-20vw", "120vw"], ["120vw", "-20vw"]]);

    // Improved vertical distribution
    const totalHeight = Math.max(containerHeight, window.innerHeight);
    const verticalPosition = Math.random() * totalHeight;
    const yBase = Math.max(0, verticalPosition);
    const yAmplitude = Math.random() * 60 + 20; // Random amplitude between 20 and 80
    const yKF = [
        yBase,
        yBase + rand(-yAmplitude, yAmplitude),
        yBase + rand(-yAmplitude/2, yAmplitude/2),
        yBase
    ];

    const duration = rand(minSpeed, maxSpeed);
    // Increased delay variance for better spacing
    const delay = rand(0, 12) + ((laneIndex % 5) / Math.max(1, 5)) * 4;
    const rotate = rand(-15, 15);
    const opacity = rand(0.75, 1);
    const z = Math.round(rand(1, 20)); // Increased z-index range for better layering


    return (
        <motion.img
            src={src}
            alt=""
            draggable={false}
            className="floating-img"
            style={{ width: size, height: size, zIndex: z }}
            initial={{ x: startx, y: yKF[0], rotate }}
            animate={{ x: endx, y: yKF }}
            transition={{
            duration,
            delay,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
            times: [0, 0.4, 0.8, 1],
            opacity,
            }}
        />
    );
}

