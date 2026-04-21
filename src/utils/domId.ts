export function toDomId(...parts: Array<string | number | undefined | null | false>) {
  return parts
    .filter(Boolean)
    .map((part) =>
      String(part)
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, ''),
    )
    .filter(Boolean)
    .join('-');
}
