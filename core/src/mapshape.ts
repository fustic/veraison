// Static map pictures: frame a box, project GeoJSON outlines into SVG path strings in Web
// Mercator (as the live map draws them), and drop detail too small to see.

import type { Bounds } from './mapnav.ts';

export interface Geometry {
  type: string;
  coordinates: unknown;
}

/** A Web Mercator frame of `width` × `height` pixels. */
export interface View {
  width: number;
  height: number;
  /** Mercator x and y (0–1 across the world) of the top-left corner. */
  x0: number;
  y0: number;
  /** Pixels per Mercator unit. */
  scale: number;
}

const mx = (lon: number) => (lon + 180) / 360;
const my = (lat: number) => {
  const s = Math.sin((Math.max(-85, Math.min(85, lat)) * Math.PI) / 180);
  return 0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI);
};

/** The frame that fits `bounds` inside the picture, centred, with `pad` pixels to spare. */
export function fitView([w, s, e, n]: Bounds, width: number, height: number, pad = 0): View {
  const dx = Math.max(mx(e) - mx(w), 1e-9);
  const dy = Math.max(my(s) - my(n), 1e-9);
  const scale = Math.min((width - 2 * pad) / dx, (height - 2 * pad) / dy);
  const cx = (mx(w) + mx(e)) / 2;
  const cy = (my(n) + my(s)) / 2;
  return { width, height, scale, x0: cx - width / 2 / scale, y0: cy - height / 2 / scale };
}

/** Pixel position of a point. */
export function project(v: View, lon: number, lat: number): [number, number] {
  return [(mx(lon) - v.x0) * v.scale, (my(lat) - v.y0) * v.scale];
}

/** The longitude/latitude box the picture shows. */
export function viewBounds(v: View): Bounds {
  const lon = (x: number) => x * 360 - 180;
  const lat = (y: number) => (360 / Math.PI) * Math.atan(Math.exp((0.5 - y) * 2 * Math.PI)) - 90;
  return [lon(v.x0), lat(v.y0 + v.height / v.scale), lon(v.x0 + v.width / v.scale), lat(v.y0)];
}

const polygons = (g: Geometry) =>
  (g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : []) as [number, number][][][];

/** Bounding box of a Polygon or MultiPolygon. */
export function geometryBounds(g: Geometry): Bounds {
  let [w, s, e, n] = [Infinity, Infinity, -Infinity, -Infinity];
  for (const poly of polygons(g))
    for (const ring of poly)
      for (const [x, y] of ring) {
        w = Math.min(w, x);
        s = Math.min(s, y);
        e = Math.max(e, x);
        n = Math.max(n, y);
      }
  return [w, s, e, n];
}

/** Whether a point lies inside a Polygon or MultiPolygon (holes respected). */
export function containsPoint(g: Geometry, lon: number, lat: number): boolean {
  let inside = false;
  for (const poly of polygons(g))
    for (const ring of poly)
      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const [xi, yi] = ring[i]!;
        const [xj, yj] = ring[j]!;
        if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
      }
  return inside;
}

/** Every vertex of a Polygon or MultiPolygon's outer rings. */
export function outerVertices(g: Geometry): [number, number][] {
  return polygons(g).flatMap((poly) => poly[0] ?? []);
}

/**
 * SVG path data for a Polygon or MultiPolygon (draw with fillRule="evenodd" for holes).
 * Rings outside the picture are skipped, points far outside are pulled in to a margin
 * around it, and points closer than `tolerance` pixels to the last one are dropped.
 */
export function geometryPath(g: Geometry, v: View, tolerance = 0.75): string {
  const { width: W, height: H } = v;
  const out: string[] = [];
  for (const poly of polygons(g))
    for (const ring of poly) {
      const pts = ring.map(([lon, lat]) => project(v, lon, lat));
      let [x0, y0, x1, y1] = [Infinity, Infinity, -Infinity, -Infinity];
      for (const [x, y] of pts) {
        x0 = Math.min(x0, x);
        y0 = Math.min(y0, y);
        x1 = Math.max(x1, x);
        y1 = Math.max(y1, y);
      }
      if (x1 < 0 || y1 < 0 || x0 > W || y0 > H) continue;
      const kept: [number, number][] = [];
      for (const [px, py] of pts) {
        const x = Math.max(-W, Math.min(2 * W, px));
        const y = Math.max(-H, Math.min(2 * H, py));
        const last = kept[kept.length - 1];
        if (last && Math.abs(last[0] - x) < tolerance && Math.abs(last[1] - y) < tolerance) continue;
        kept.push([x, y]);
      }
      if (kept.length < 3) continue;
      out.push(`M${kept.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join('L')}Z`);
    }
  return out.join('');
}

/**
 * The box a locator picture frames for a region: its outline with `margin` on each side,
 * widened to at least `minKm` across so a small appellation still shows its neighbours.
 */
export function locatorBounds([w, s, e, n]: Bounds, margin = 0.25, minKm = 30): Bounds {
  const lat = (s + n) / 2;
  const kmLon = 111.32 * Math.cos((lat * Math.PI) / 180);
  const half = (span: number, kmPerDeg: number) => Math.max((span * (1 + 2 * margin)) / 2, minKm / kmPerDeg / 2);
  const hx = half(e - w, kmLon);
  const hy = half(n - s, 110.574);
  const cx = (w + e) / 2;
  const cy = (s + n) / 2;
  return [cx - hx, cy - hy, cx + hx, cy + hy];
}
