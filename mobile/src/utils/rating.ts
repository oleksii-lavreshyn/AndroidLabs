export type StarFill='full'|'half'|'empty';
export function calculateStars(value:number):StarFill[]{const clamped=Math.max(0,Math.min(5,value));return Array.from({length:5},(_,i)=>clamped>=i+1?'full':clamped>=i+0.5?'half':'empty');}
