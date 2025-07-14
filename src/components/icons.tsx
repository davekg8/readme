import type { SVGProps } from 'react';

export const QuillIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20 18c-3.92-3.92-1.77-9.3-4.14-11.66-2.37-2.37-7.74-1.77-11.66-4.14" />
    <path d="m5.86 3.86 14.28 14.28" />
  </svg>
);

export const Logo = (props: SVGProps<SVGSVGElement>) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        {...props}
    >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <path d="M12 18a2 2 0 0 0-2-2c-1.54.9-2.5 2.5-2.5 4.5 0 1.93 1.57 3.5 3.5 3.5 1.74 0 3.2-1.2 3.5-2.8"></path>
        <path d="M12 12v2"></path>
    </svg>
);
