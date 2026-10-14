# Appellation outlines

The map draws real outlines for regions listed in `eu-pdo-regions.ts` and a placeholder
circle (from `centroid` and `radiusKm` in `/content`) for everything else.

## Source

Candiago, S. et al. (2022). *A geospatial inventory of regulatory information for wine
protected designations of origin in Europe.* Scientific Data 9, 394.
Data: https://doi.org/10.6084/m9.figshare.c.5877659.v1 (file `EU_PDO.gpkg`).

One outline per EU wine PDO (1,177 in 21 countries), drawn from the municipalities each PDO
covers. That is coarser than the parcel-level INAO delimitation, but right for a study map,
and it covers Italy, Spain, Germany and the rest when those chapters arrive.

## Updating

1. Download `EU_PDO.gpkg` to `tools/boundaries/source/` (ignored by git).
2. Map study regions to PDO names in `eu-pdo-regions.ts`. `npm run map:boundaries -- --list fr`
   prints every French PDO name; use `it`, `es`, `de`… for other countries.
3. `npm run map:boundaries` writes `content/boundaries/regions.json` (simplified, committed)
   and lists any names it could not find.
4. `npm run content:build` puts the outlines into `app/src/generated/regions.geojson.json`.

`build-boundaries.ts` reads the GeoPackage with Node's built-in SQLite and converts the
European LAEA grid (EPSG:3035) to longitude/latitude itself, so no GDAL is needed.

## Outside the EU

| Area | Source |
| --- | --- |
| USA | UC Davis AVA project (GitHub `UCDavisLibrary/ava`), GeoJSON per AVA, CC0 |
| Others | Hand-traced from official descriptions, about 40 syllabus areas |
