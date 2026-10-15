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
| Australia | Done: Wine Australia GI feature service (CC BY 4.0). Save the zones, regions and subregions layers as GeoJSON in `source/au/`, run `npm run map:world` |
| New Zealand | Done: IPONZ GI register data files. Unzip each GI into `source/nz/` (the builder reads `<GI>.json`) |
| Chile | Done: Decree 464 (SAG) valleys as provinces, regions or comunas, from geoBoundaries CHL (CC BY 3.0 IGO) in `source/gb/` |
| Argentina | Done: INV IGs as departments or provinces, from geoBoundaries ARG |
| South Africa | Approximate: Wine of Origin districts drawn as the nearest local municipality (geoBoundaries ZAF ADM3); Constantia, Durbanville, Franschhoek and Elgin stay circles. SAWIS publishes the real boundaries only as PDF maps |

The mapping for these five countries is in `world-regions.ts`; `npm run map:world` writes
`content/boundaries/world.json`. geoBoundaries files are the `_simplified.geojson` downloads from
`media.githubusercontent.com/media/wmgeolab/geoBoundaries/main/releaseData/gbOpen/<ISO>/<ADM>/`,
saved as `<ISO>-<ADM>.geojson`.
