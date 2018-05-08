export default function(min: number, max: number): number[] {
  return Array.from(Array(max - min).keys()).map(n => n + min);
}
