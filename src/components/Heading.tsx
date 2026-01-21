import React from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingProps = {
    level: HeadingLevel;
    children: React.ReactNode;
    className?: string;
}

const defaultClasses: Record<HeadingLevel, string> = {
    h1: "text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-primary text-center",
    h2: "text-3xl md:text-4xl font-bold leading-snug tracking-tight tracking-tight text-primary",
    h3: "text-2xl md:text-3xl font-semibold leading-snug text-primary",
    h4: "text-xl md:text-2xl font-semibold leading-snug text-secondary",
    h5: "text-lg md:text-xl font-semibold leading-snug",
    h6: "text-base md:text-lg font-medium leading-normal text-secondary",
}

const Heading = ({level = "h1", children, className = ""}: HeadingProps) => {
    const Tag = level;
    return <Tag className={`${defaultClasses[level]} ${className}`.trim()}>{children}</Tag>;
}

export default Heading;