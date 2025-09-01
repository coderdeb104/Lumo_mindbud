import type { SVGProps } from "react";

export const StressedIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="M15.5 8.5l-2.5 2.5-2.5-2.5-2.5 2.5 2.5 2.5-2.5 2.5 2.5 2.5 2.5-2.5 2.5 2.5" />
  </svg>
);

export const AnxiousIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="M7 12c.5-3.5 3-5 5-5s4.5 1.5 5 5c-.5 3.5-3 5-5 5s-4.5-1.5-5-5z" />
  </svg>
);
