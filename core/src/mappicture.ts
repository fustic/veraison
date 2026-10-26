// The still map on a region page, as SVG path data: land, neighbouring outlines, the region
// itself, the areas inside it, and a small inset showing where in the country it is.

import type { Region } from './content.ts';
import { boundsOverlap, COUNTRY_VIEW, mainlandBounds, regionBounds, type Bounds } from './mapnav.ts';
import { containsPoint, fitView, geometryBounds, outerVertices, geometryPath, locatorBounds, project, viewBounds, type Geometry } from './mapshape.ts';
import { regionCountry } from './reveal.ts';

export interface Shape {
  id: string;
  geometry: Geometry;
  bbox: Bounds;
  /** Drawn as a dashed line: a placeholder circle or an approximate outline. */
  rough: boolean;
}

export interface ShapeIndex {
  regions: Map<string, Shape>;
  countries: Shape[];
  countryParts: Map<string, Shape[]>;
}

type RegionFc = { features: { geometry: Geometry; properties: { id: string; bbox?: Bounds | null; placeholder?: boolean; approximate?: boolean } }[] };
type CountryFc = { features: { geometry: Geometry; properties: { iso: string } }[] };

export function indexShapes(regionsFc: RegionFc, countriesFc: CountryFc): ShapeIndex {
  const regions = new Map<string, Shape>();
  for (const f of regionsFc.features) {
    const p = f.properties;
    regions.set(p.id, { id: p.id, geometry: f.geometry, bbox: p.bbox ?? geometryBounds(f.geometry), rough: !!p.placeholder || !!p.approximate });
  }
  const countries = countriesFc.features.map((f) => ({ id: f.properties.iso, geometry: f.geometry, bbox: geometryBounds(f.geometry), rough: false }));
  const countryParts = new Map<string, Shape[]>();
  for (const c of countries) countryParts.set(c.id, [...(countryParts.get(c.id) ?? []), c]);
  return { regions, countries, countryParts };
}

const area = ([w, s, e, n]: Bounds) => (e - w) * (n - s);

/** Frame for a whole country: a hand-set one, else its largest landmass. */
export function countryFrame(idx: ShapeIndex, iso: string): Bounds | null {
  const set = COUNTRY_VIEW[iso];
  if (set) return set;
  const main = [...(idx.countryParts.get(iso) ?? [])].sort((a, b) => area(b.bbox) - area(a.bbox))[0];
  return main ? mainlandBounds(main.geometry) : null;
}

export interface Outline {
  id: string;
  d: string;
  rough: boolean;
}

export interface Picture {
  /**
   * Whether to draw the sea. The country outlines are too coarse for coastlines at
   * appellation scale, so a small picture is all land with the region outlines on top,
   * unless the region is an island the coarse outlines miss: then it is all sea.
   */
  sea: boolean;
  land: Outline[];
  /** Other regions nearby (and the ones this region sits in), thin grey lines. */
  context: Outline[];
  /** The region itself, or the whole country for a country page. */
  focus: Outline[];
  /** Areas inside the region, largest first. */
  inside: Outline[];
  /** Where in the country the picture is: country outline and the shown box [x, y, w, h]. */
  inset: { size: number; land: Outline[]; box: [number, number, number, number] } | null;
}

export function regionPicture(
  idx: ShapeIndex,
  region: Region,
  childrenOf: ReadonlyMap<string | null, readonly Region[]>,
  width: number,
  height: number,
  insetSize = 76,
): Picture {
  const iso = regionCountry(region.id) ?? '';
  const isCountry = region.level === 'country';
  const own = idx.regions.get(region.id);

  const within = new Set<string>();
  const walk = (r: Region) => {
    for (const c of childrenOf.get(r.id) ?? []) {
      within.add(c.id);
      walk(c);
    }
  };
  walk(region);

  const target = (isCountry ? countryFrame(idx, iso) : null) ?? locatorBounds(own?.bbox ?? regionBounds(region, childrenOf, 0));
  const v = fitView(target, width, height, 10);
  const shown = viewBounds(v);
  const near = (s: Shape) => boundsOverlap(s.bbox, shown);
  const bySize = (a: Shape, b: Shape) => area(b.bbox) - area(a.bbox);
  const outline = (s: Shape): Outline => ({ id: s.id, d: geometryPath(s.geometry, v), rough: s.rough });
  const drawn = (o: Outline) => o.d.length > 0;

  const coarse = shown[3] - shown[1] < 1.2;
  const nearLand = idx.countries.filter(near);
  const onLand = () => {
    const pts = own ? outerVertices(own.geometry) : [region.centroid as [number, number]];
    const step = Math.max(1, Math.floor(pts.length / 60));
    let hits = 0;
    let total = 0;
    for (let i = 0; i < pts.length; i += step, total++) if (nearLand.some((c) => containsPoint(c.geometry, pts[i]![0], pts[i]![1]))) hits++;
    return hits >= total / 2;
  };
  const sea = !coarse || !onLand();
  const land = coarse ? [] : nearLand.map(outline).filter(drawn);
  const nearby = [...idx.regions.values()].filter(near).sort(bySize);
  const context = nearby.filter((s) => s.id !== region.id && !within.has(s.id)).map(outline).filter(drawn);
  const inside = nearby.filter((s) => within.has(s.id)).map(outline).filter(drawn);
  const focus = (isCountry ? (idx.countryParts.get(iso) ?? []).filter(near) : own ? [own] : []).map(outline).filter(drawn);

  let inset: Picture['inset'] = null;
  const whole = isCountry ? null : countryFrame(idx, iso);
  if (whole && area(shown) < 0.6 * area(whole)) {
    const iv = fitView(whole, insetSize, insetSize, 6);
    const clamp = (x: number) => Math.max(1, Math.min(insetSize - 1, x));
    const [x0, y0] = project(iv, shown[0], shown[3]).map(clamp) as [number, number];
    const [x1, y1] = project(iv, shown[2], shown[1]).map(clamp) as [number, number];
    inset = {
      size: insetSize,
      land: (idx.countryParts.get(iso) ?? []).map((c) => ({ id: c.id, d: geometryPath(c.geometry, iv, 0.5), rough: false })).filter(drawn),
      box: [x0, y0, x1 - x0, y1 - y0],
    };
  }
  return { sea, land, context, focus, inside, inset };
}
