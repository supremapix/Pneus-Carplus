export function toSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9_-\s]/gi, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function getTireSlug(tire: { id: string; brand: string; name?: string; width: number; aspectRatio: number; rim: number; model: string }): string {
  const brand = tire.brand.toUpperCase();
  const width = tire.width;
  const aspect = tire.aspectRatio;
  const rim = tire.rim;
  // Clean model: replace spaces with + or keep clean, but let's replace space/slashes with + or -
  const model = tire.model.toUpperCase()
    .replace(/[\s/]+/g, '-')
    .replace(/[^A-Z0-9-]/g, '');

  let loadSpeed = '';
  // Try to match standard load&speed rate like 88H, 110T, 84T, 91V, 100H, etc.
  const tireName = tire.name || `${tire.brand} ${tire.model}`;
  const loadSpeedMatch = tireName.match(/\b(\d{2,3}[A-Z])\b/i);
  if (loadSpeedMatch) {
    loadSpeed = loadSpeedMatch[1].toUpperCase();
  }

  let parts = [brand, width, aspect, rim];
  if (loadSpeed) {
    parts.push(loadSpeed);
  }
  parts.push(model);

  return parts.join('+').replace(/[^a-zA-Z0-9+_-]/g, '');
}

