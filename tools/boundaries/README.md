# Appellation outlines

The map draws real outlines for EU regions and a placeholder circle (from `centroid` and
`radiusKm` in `/content`) for everything else.

How a region gets its outline:

1. An entry in `eu-pdo-regions.ts` (a list of PDO names; an empty list keeps the circle).
2. Otherwise the PDO in the same country with the region's own name (accents and punctuation ignored).
3. Otherwise the combined outlines of the regions inside it (Côte de Nuits, Roussillon…).

## Source

Candiago, S. et al. (2022). *A geospatial inventory of regulatory information for wine
protected designations of origin in Europe.* Scientific Data 9, 394.
Data: https://doi.org/10.6084/m9.figshare.c.5877659.v1 (files `EU_PDO.gpkg` and `PDO_EU_id.csv`).

One outline per EU wine PDO (1,177 in 21 countries), drawn from the municipalities each PDO
covers. That is coarser than the parcel-level INAO delimitation, but right for a study map,
and it covers Italy, Spain, Germany and the rest when those chapters arrive.

## Updating

1. Download `EU_PDO.gpkg` and `PDO_EU_id.csv` to `tools/boundaries/source/` (ignored by git).
   The GeoPackage only has PDO codes; the CSV supplies the names.
2. Most regions match by name. For the rest, add PDO names to `eu-pdo-regions.ts`.
   `npm run map:boundaries -- --list fr` prints every French PDO name; use `it`, `es`, `de`…
3. `npm run map:boundaries` writes `content/boundaries/regions.json` (simplified, committed)
   and lists names it could not find and EU regions left without an outline.
4. `npm run content:build` puts the outlines into `app/src/generated/regions.geojson.json`.

`build-boundaries.ts` reads the GeoPackage with Node's built-in SQLite and converts the
European LAEA grid (EPSG:3035) to longitude/latitude itself, so no GDAL is needed.

## Outside the EU

| Area | Source |
| --- | --- |
| USA | Done: UC Davis AVA project (GitHub `UCDavisLibrary/ava`, CC0). Put `avas_aggregated_files/avas.geojson` in `source/ava/`, run `npm run map:us`; mappings in `us-ava-regions.ts` |
| Australia | Wine Australia GI feature service (zones, regions, subregions), CC BY 4.0. Not reachable from the cloud shell; download layers as GeoJSON |
| New Zealand | IPONZ GI register: each registered GI has a downloadable "geographical data file" (ZIP) |
| Chile | Decree 464 (SAG) defines valleys by provinces and comunas: build from geoBoundaries CHL ADM2/ADM3 (CC BY 4.0) |
| Argentina | INV IG list: IGs are departments or provinces (Valle de Uco = San Carlos + Tunuyán + Tupungato): build from geoBoundaries ARG ADM1/ADM2 |
| South Africa | SAWIS publishes Wine of Origin maps as PDFs only; approximate from municipalities or trace by hand |
