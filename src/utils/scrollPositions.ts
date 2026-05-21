const scrollPositions = new Map<string, number>();

export function saveScrollPosition(locationKey: string, position: number) {
  scrollPositions.set(locationKey, position);
}

export function getSavedScrollPosition(locationKey: string) {
  return scrollPositions.get(locationKey);
}
