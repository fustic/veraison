import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fitView, geometryBounds, geometryPath, locatorBounds, project, viewBounds } from '../src/mapshape.ts';

const square = { type: 'Polygon', coordinates: [[[0, 40], [1, 40], [1, 41], [0, 41], [0, 40]]] };

test('a fitted frame puts the box inside the picture, centred', () => {
  const v = fitView([0, 40, 1, 41], 300, 150, 10);
  const [x0, y0] = project(v, 0, 41);
  const [x1, y1] = project(v, 1, 40);
  assert.ok(x0 >= 0 && y0 >= 10 - 1e-6 && x1 <= 300 && y1 <= 140 + 1e-6);
  assert.ok(Math.abs((x0 + x1) / 2 - 150) < 1e-6 && Math.abs((y0 + y1) / 2 - 75) < 1e-6);
  const [w, s, e, n] = viewBounds(v);
  assert.ok(w < 0 && e > 1 && s < 40 && n > 41);
});

test('paths skip rings outside the picture and tiny steps', () => {
  const v = fitView([0, 40, 1, 41], 200, 200);
  const far = { type: 'MultiPolygon', coordinates: [square.coordinates, [[[50, 0], [51, 0], [51, 1], [50, 0]]]] };
  const d = geometryPath(far, v);
  assert.equal(d.split('M').length - 1, 1);
  const dense = { type: 'Polygon', coordinates: [[[0, 40], [0.0001, 40], [0.0002, 40], [1, 40], [1, 41], [0, 41], [0, 40]]] };
  assert.equal(geometryPath(dense, v).split('L').length, geometryPath(square, v).split('L').length);
});

test('geometry bounds cover every ring', () => {
  assert.deepEqual(geometryBounds(square), [0, 40, 1, 41]);
});

test('locator frames widen small appellations', () => {
  const [w, s, e, n] = locatorBounds([-0.8, 45.1, -0.75, 45.15], 0.25, 30);
  assert.ok((n - s) * 110.574 >= 30 - 1e-6);
  assert.ok((e - w) * 111.32 * Math.cos((45.125 * Math.PI) / 180) >= 30 - 1e-6);
  const big = locatorBounds([0, 40, 4, 44], 0.25, 30);
  assert.deepEqual(big, [-1, 39, 5, 45]);
});

test('point-in-polygon respects holes', async () => {
  const { containsPoint } = await import('../src/mapshape.ts');
  const donut = { type: 'Polygon', coordinates: [[[0, 0], [10, 0], [10, 10], [0, 10], [0, 0]], [[4, 4], [6, 4], [6, 6], [4, 6], [4, 4]]] };
  assert.equal(containsPoint(donut, 1, 1), true);
  assert.equal(containsPoint(donut, 5, 5), false);
  assert.equal(containsPoint(donut, 11, 5), false);
});
