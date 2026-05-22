const scrollPositions = new Map<string, number>();

// Keep scroll positions scoped to the current single-page app session.
export function saveScrollPosition(locationKey: string, position: number) {
  scrollPositions.set(locationKey, position);
}

export function getSavedScrollPosition(locationKey: string) {
  return scrollPositions.get(locationKey);
}
