export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}
