'use client';

import '../test.css';
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

type Point = { x: number; y: number };

const TestPage = () => {
    const rootRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

        const ctx = gsap.context(() => {
            const rx = window.innerWidth < 1000 ? window.innerWidth / 1200 : 1;
            const ry = window.innerHeight < 700 ? window.innerHeight / 1200 : 1;

            const path: Point[] = [
                // 1
                { x: 800, y: 200 },
                { x: 900, y: 20 },
                { x: 1100, y: 100 },
                // 2
                { x: 1000, y: 200 },
                { x: 900, y: 20 },
                { x: 10, y: 500 },
                // 3
                { x: 100, y: 300 },
                { x: 500, y: 400 },
                { x: 1000, y: 200 },
                // 4
                { x: 1100, y: 300 },
                { x: 400, y: 400 },
                { x: 200, y: 250 },
                // 5
                { x: 100, y: 300 },
                { x: 500, y: 450 },
                { x: 1100, y: 500 },
            ];

            const scaledPath: Point[] = path.map(({ x, y }) => ({ x: x * rx, y: y * ry }));

            const q = gsap.utils.selector(root);
            const fish = q<HTMLElement>(".fish")[0];
            if (!fish) return;

            const fishHeadAndBody = [
                ...q<HTMLElement>(".fish__head"),
                ...q<HTMLElement>(".fish__body"),
            ];

            const lights = q<HTMLElement>("[data-lights]");

            // bubbles timeline
            const bubblesTl = gsap.timeline();
            bubblesTl.set(".bubbles__bubble", { y: 100 });
            bubblesTl.to(".bubbles__bubble", {
                scale: 1.2,
                y: -300,
                opacity: 1,
                duration: 2,
                stagger: 0.2,
            });
            bubblesTl.to(
                ".bubbles__bubble",
                {
                    scale: 1,
                    opacity: 0,
                    duration: 1,
                },
                "-=1"
            );
            bubblesTl.pause();

            // fish motion timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    scrub: 1.5,
                },
            });

            tl.to(fish, {
                motionPath: {
                    path: scaledPath,
                    align: "self",
                    alignOrigin: [0.5, 0.5],
                    autoRotate: true,
                },
                duration: 10,
                immediateRender: true,
            });

            tl.to(fish, { rotateX: 180 }, 1);
            tl.to(fish, { rotateX: 0 }, 2.5);
            tl.to(fish, { z: -500, duration: 2 }, 2.5);

            tl.to(fish, { rotateX: 180 }, 4);
            tl.to(fish, { rotateX: 0 }, 5.5);
            tl.to(fish, { z: -50, duration: 2 }, 5);

            tl.to(fish, { rotate: 0, duration: 1 }, "-=1");

            tl.to(".fish__skeleton", { opacity: 0.6, duration: 0.1, repeat: 4 }, "-=3");
            tl.to(fishHeadAndBody, { opacity: 0, duration: 0.1, repeat: 4 }, "-=3");
            tl.to(".fish__inner", { opacity: 0.1, duration: 1 }, "-=1");
            tl.to(".fish__skeleton", { opacity: 0.1, duration: 1 }, "-=1");

            bubblesTl.play();
            tl.pause();

            // lights timeline (defensive: only if exists)
            if (lights[0]) {
                const lightsTl = gsap.timeline({
                    scrollTrigger: { scrub: 6 },
                });

                lightsTl.from(
                    lights[0],
                    {
                        x: window.innerWidth * -1,
                        y: window.innerHeight,
                        ease: "power4.out",
                        duration: 80,
                    },
                    0
                );

                lightsTl.to(
                    lights[0],
                    {
                        x: window.innerWidth,
                        y: window.innerHeight * -1,
                        ease: "power4.out",
                        duration: 80,
                    },
                    "-=5"
                );
            }

            const rotateFish = (self: ScrollTrigger): void => {
                gsap.to(fish, { rotationY: self.direction === -1 ? 180 : 0, duration: 0.4 });
            };

            // Keep sections as scroll-length "spacers" but no text logic
            const sections = gsap.utils.toArray<HTMLElement>("section");
            sections.forEach((section, i) => {
                ScrollTrigger.create({
                    trigger: section,
                    start: "top top",
                    onEnter: () => {
                        const { top, left } = fish.getBoundingClientRect();
                        gsap.set(".bubbles", { x: left, y: top });

                        if (bubblesTl.paused()) bubblesTl.restart();
                        if (i > 6) gsap.to(".bubbles", { opacity: 0 });
                        else gsap.to(".bubbles", { opacity: 1 });
                    },
                    onEnterBack: () => {
                        if (i <= 6) gsap.to(".bubbles", { opacity: 1 });
                    },
                    onUpdate: rotateFish,
                });
            });
        }, rootRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={rootRef} className="fish-animation__root">
            <div className="fish-wrapper">
                <div className="fish">
                    <div className="fish__skeleton" />
                    <div className="fish__inner">
                        {/* body */}
                        <div className="fish__body" />
                        <div className="fish__body" />
                        <div className="fish__body" />
                        <div className="fish__body" />

                        {/* head */}
                        <div className="fish__head" />
                        <div className="fish__head fish__head--2" />
                        <div className="fish__head fish__head--3" />
                        <div className="fish__head fish__head--4" />

                        <div className="fish__tail-main" />
                        <div className="fish__tail-fork" />

                        <div className="fish__fin" />
                        <div className="fish__fin fish__fin--2" />
                    </div>
                </div>
            </div>

            <div className="bubbles">
                <div className="bubbles__inner">
                    <div className="bubbles__bubble" />
                    <div className="bubbles__bubble" />
                    <div className="bubbles__bubble" />
                </div>
            </div>

            <div className="lights">
                <div className="lights__group" data-lights="1">
                    <div className="lights__light" />
                    <div className="lights__light" />
                    <div className="lights__light" />
                    <div className="lights__light" />
                    <div className="lights__light" />
                    <div className="lights__light" />
                    <div className="lights__light" />
                    <div className="lights__light" />
                </div>
            </div>

            <div className="content">
                {Array.from({ length: 11 }).map((_, i) => (
                    <section key={i}>
                        <div className="section__content"/>
                    </section>
                ))}
            </div>
        </div>
    );
}

export default TestPage;