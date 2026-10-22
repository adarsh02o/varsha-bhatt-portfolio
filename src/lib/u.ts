/** Size in design px that scales with the viewport via the `--u` CSS unit (see globals.css). */
export const u = (n: number) => `calc(${n} * var(--u))`;
