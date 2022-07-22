export function visualizeActiveButton(activeButtonValue : string, cumulativeView: boolean): string {
  if ((cumulativeView === false && activeButtonValue === 'game-by-game') ||
        (cumulativeView === true && activeButtonValue === 'cumulative')) {
    return 'chart-button-active';
  } else {
    return '';
  }
}
