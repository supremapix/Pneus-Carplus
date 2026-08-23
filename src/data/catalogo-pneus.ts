import { CatalogTire } from '../types';
import catalogData from '../../catalogo-pneus.json';

export const CATALOGO_PNEUS: CatalogTire[] = catalogData as CatalogTire[];

export const CATALOG_BRANDS = Array.from(new Set(CATALOGO_PNEUS.map(t => t.marca))).sort();
export const CATALOG_CATEGORIES = Array.from(new Set(CATALOGO_PNEUS.map(t => t.categoria))).sort();
export const CATALOG_RIMS = Array.from(new Set(CATALOGO_PNEUS.map(t => t.aro))).sort((a, b) => a - b);
export const CATALOG_WIDTHS = Array.from(new Set(CATALOGO_PNEUS.map(t => t.largura))).filter(Boolean).sort((a, b) => a - b);
export const CATALOG_PROFILES = Array.from(new Set(CATALOGO_PNEUS.map(t => t.perfil))).filter(Boolean).sort((a, b) => a - b);
export const CATALOG_VEHICLE_TYPES = Array.from(
  new Set(CATALOGO_PNEUS.flatMap(t => t.tipoVeiculo || []))
).sort();

export function findCatalogTireBySlug(slug: string): CatalogTire | undefined {
  if (!slug) return undefined;
  const cleanSlug = slug.toLowerCase().replace(/^\/pneu\//, '').replace(/\/$/, '');
  return CATALOGO_PNEUS.find(t => 
    t.slug.toLowerCase() === cleanSlug || 
    t.slug.toLowerCase() === `pneu-${cleanSlug}` ||
    t.id.toString() === cleanSlug
  );
}

export function getTiresByBrand(brand: string): CatalogTire[] {
  const b = brand.toLowerCase();
  return CATALOGO_PNEUS.filter(t => t.marca.toLowerCase() === b);
}

export function getTiresByRim(rim: number): CatalogTire[] {
  return CATALOGO_PNEUS.filter(t => t.aro === rim);
}

export function getTiresByCategory(category: string): CatalogTire[] {
  const c = category.toLowerCase();
  return CATALOGO_PNEUS.filter(t => t.categoria.toLowerCase() === c);
}
