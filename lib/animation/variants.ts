// import { type } from "@testing-library/user-event/dist/type";

export const fadeInVariants = (direction: string, delay: number) => ({
    initial: {
        opacity: 0,
        x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
        y: direction === "up" ? "-100%" : direction === "down" ? "100%" : 0,
    },
    animate: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
            duration: 1,
            type: "tween",
            delay: delay,
            ease: [0.25, 0.25, 0.25, 0.75],
        },
    },
});
