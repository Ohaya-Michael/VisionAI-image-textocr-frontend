import React from 'react';
import { 
  Loader2 
} from 'lucide-react';

/**
 * Spinner - A basic spinning icon using Material Symbols
 * @param {string} size - tailwind text size (e.g., 'text-2xl')
 * @param {string} color - tailwind text color
 */
const Spinner = ({ size = 'text-3xl', color = 'text-blue-500' }) => (
  // <span className={`material-symbols-outlined animate-spin ${size} ${color} leading-none`}>
  //   progress_activity
  // </span>
  <Loader2 className={`animate-spin ${size} ${color} leading-none`} />
);

export default Spinner;