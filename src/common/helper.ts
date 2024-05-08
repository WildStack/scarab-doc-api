export function getRandomLightColorRgb(): string {
  return (
    'rgb(' +
    (Math.floor((256 - 229) * Math.random()) + 230) +
    ',' +
    (Math.floor((256 - 229) * Math.random()) + 230) +
    ',' +
    (Math.floor((256 - 229) * Math.random()) + 230) +
    ')'
  );
}

export function cyanLog<T>(val: T): void {
  console.log('\x1b[36m%s\x1b[0m', val);
}
