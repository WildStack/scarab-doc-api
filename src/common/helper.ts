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
