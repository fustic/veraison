# Real appellation boundaries (next step)

The map currently draws a circle per region from `centroid` and `radiusKm` in
`/content`. That is enough to test the map, tapping and "seen" tinting. Real
outlines replace the circles region by region.

| Area | Source | Notes |
| --- | --- | --- |
| France | INAO AOC parcel delimitations, data.gouv.fr dataset `5aaf6b7ec751df67b0d7a87f` | Official shapefiles at parcel level. Dissolve parcels by appellation, then simplify. Coverage is not yet complete. |
| Rest of the EU | Candiago et al. 2022, "A geospatial inventory of regulatory information for wine PDOs in Europe" (Scientific Data) | Municipality-level outlines for all 1,177 EU wine PDOs. Check the licence before shipping. |
| USA | UC Davis AVA project (GitHub `UCDavisLibrary/ava`) | GeoJSON per AVA. |
| Everything else | Hand-traced in QGIS from official descriptions | Around 40 syllabus areas. |

Suggested pipeline, on your Mac:

```sh
brew install gdal tippecanoe pmtiles

# 1. dissolve INAO parcels into one polygon per appellation
ogr2ogr -f GeoJSON build/fr-aoc.geojson inao.shp -dialect sqlite \
  -sql "SELECT app AS name, ST_Union(geometry) AS geometry FROM inao GROUP BY app"

# 2. simplify and tile (zoom 4–12 is plenty for study)
tippecanoe -o build/regions.mbtiles -z12 -Z4 --simplification=4 -l regions build/fr-aoc.geojson
pmtiles convert build/regions.mbtiles app/assets/map/regions.pmtiles
```

Then map each INAO appellation name to a `region:` id in `/content` (a small lookup
table), and switch the map's GeoJSONSource to a VectorSource reading the bundled
PMTiles file. Keep the GeoJSON circles as the fallback for regions without outlines.
