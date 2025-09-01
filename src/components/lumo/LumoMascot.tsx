import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

const LumoMascot = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    className={cn("animate-float", props.className)}
  >
    <defs>
      <radialGradient id="lumoGradient" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
        <stop offset="70%" stopColor="hsl(var(--primary))" />
        <stop offset="100%" stopColor="hsl(var(--accent))" />
      </radialGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#glow)">
      <path
        d="M106.1,65.3c0,23-17.6,41.7-39.4,41.7S27.3,88.3,27.3,65.3s15.9-38.3,37.7-41.2 C83.2,21.5,106.1,42.3,106.1,65.3z"
        fill="url(#lumoGradient)"
        transform="matrix(0.95, 0, 0, 1, 3, 0)"
      />
      <ellipse cx="55" cy="60" rx="4" ry="6" fill="hsl(var(--primary-foreground))" opacity="0.9" />
      <ellipse cx="75" cy="60" rx="4" ry="6" fill="hsl(var(--primary-foreground))" opacity="0.9" />
    </g>
  </svg>
);

export default LumoMascot;
