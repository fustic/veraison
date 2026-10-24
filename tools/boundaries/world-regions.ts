// Where the outlines for Australia, New Zealand, Chile, Argentina and South Africa come from.
// Used by tools/build-world-boundaries.ts. A region not listed here:
//   Australia: the Wine Australia GI region (or subregion) with the region's own name;
//   New Zealand: the IPONZ GI file named after the region (spaces → _, apostrophes dropped);
//   elsewhere, and when nothing matches: the combined outlines of the regions inside it.

/** One set of shapes: names from a source, optionally limited to one state or province. */
export type Pick =
  | { src: 'au-zone' | 'au-region' | 'au-subregion'; names?: string[]; state?: string; exclude?: string[] }
  | { src: 'nz'; names: string[] }
  | { src: 'CHL-ADM1' | 'CHL-ADM2' | 'CHL-ADM3' | 'ARG-ADM1' | 'ARG-ADM2' | 'ZAF-ADM3'; names: string[]; within?: string };

export const WORLD: Record<string, Pick[]> = {
  // Australia (Wine Australia GIs, CC BY 4.0). States are the sum of their zones, leaving out
  // the vast catch-all zones of the outback, so the outline shows where the vineyards are.
  'region:au-south-australia': [{ src: 'au-zone', state: 'SA', exclude: ['Far North'] }],
  'region:au-victoria': [{ src: 'au-zone', state: 'VIC' }],
  'region:au-new-south-wales': [{ src: 'au-zone', state: 'NSW', exclude: ['Western Plains'] }],
  'region:au-western-australia': [{ src: 'au-zone', state: 'WA', exclude: ['Eastern Plains, Inland And North Of Western Australia', 'Central Western Australia'] }],
  'region:au-hunter-valley': [{ src: 'au-region', names: ['Hunter'] }],

  // New Zealand (IPONZ GI register)
  'region:nz-canterbury': [{ src: 'nz', names: ['North_Canterbury'] }],

  // Chile (Decree 464: valleys are provinces, regions or comunas; geoBoundaries, CC BY 3.0 IGO)
  'region:cl-coquimbo': [{ src: 'CHL-ADM1', names: ['Región de Coquimbo'] }],
  'region:cl-elqui-valley': [{ src: 'CHL-ADM2', names: ['Provincia de Elqui'] }],
  'region:cl-limari-valley': [{ src: 'CHL-ADM2', names: ['Provincia de Limarí'] }],
  'region:cl-choapa-valley': [{ src: 'CHL-ADM2', names: ['Provincia de Choapa'] }],
  'region:cl-aconcagua-valley': [{ src: 'CHL-ADM2', names: ['Provincia de Los Andes', 'Provincia de San Felipe de Aconcagua'] }],
  'region:cl-casablanca-valley': [{ src: 'CHL-ADM3', names: ['Casablanca'] }],
  'region:cl-san-antonio-valley': [{ src: 'CHL-ADM2', names: ['Provincia de San Antonio'] }],
  'region:cl-maipo-valley': [{ src: 'CHL-ADM1', names: ['Región Metropolitana de Santiago'] }],
  'region:cl-cachapoal-valley': [{ src: 'CHL-ADM2', names: ['Provincia de Cachapoal'] }],
  'region:cl-colchagua-valley': [{ src: 'CHL-ADM2', names: ['Provincia de Colchagua', 'Provincia de Cardenal Caro'] }],
  'region:cl-curico-valley': [{ src: 'CHL-ADM2', names: ['Provincia de Curicó'] }],
  'region:cl-maule-valley': [{ src: 'CHL-ADM2', names: ['Provincia de Talca', 'Provincia de Linares', 'Provincia de Cauquenes'] }],
  'region:cl-itata-valley': [{ src: 'CHL-ADM1', names: ['Región de Ñuble'] }],
  'region:cl-bio-bio-valley': [{ src: 'CHL-ADM2', names: ['Provincia de Bío-Bío'] }],
  'region:cl-malleco-valley': [{ src: 'CHL-ADM2', names: ['Provincia de Malleco'] }],

  // Argentina (INV: IGs are departments or provinces; geoBoundaries, CC BY 3.0 IGO)
  'region:ar-salta': [{ src: 'ARG-ADM2', names: ['Cafayate', 'San Carlos', 'Molinos', 'Cachi'], within: 'Salta' }],
  'region:ar-mendoza': [{ src: 'ARG-ADM1', names: ['Mendoza'] }],
  'region:ar-lujan-de-cuyo': [{ src: 'ARG-ADM2', names: ['Luján de Cuyo'], within: 'Mendoza' }],
  'region:ar-uco-valley': [{ src: 'ARG-ADM2', names: ['Tupungato', 'Tunuyán', 'San Carlos'], within: 'Mendoza' }],
  'region:ar-maipu': [{ src: 'ARG-ADM2', names: ['Maipú'], within: 'Mendoza' }],
  'region:ar-san-rafael': [{ src: 'ARG-ADM2', names: ['San Rafael'], within: 'Mendoza' }],
  // geoBoundaries spells the province 'La Roja'.
  'region:ar-la-rioja': [{ src: 'ARG-ADM2', names: ['Chilecito', 'Famatina'], within: 'La Roja' }],
  'region:ar-san-juan': [{ src: 'ARG-ADM2', names: ['Pocito', 'Ullum', 'Zonda', 'Sarmiento'], within: 'San Juan' }],
  'region:ar-rio-negro': [{ src: 'ARG-ADM1', names: ['Río Negro'] }],
  'region:ar-neuquen': [{ src: 'ARG-ADM1', names: ['Neuquén'] }],

  // South Africa: APPROXIMATE. Wine of Origin districts drawn as the local municipality that
  // covers most of each (SAWIS publishes the real boundaries only as PDF maps).
  'region:za-stellenbosch': [{ src: 'ZAF-ADM3', names: ['Stellenbosch'] }],
  'region:za-paarl': [{ src: 'ZAF-ADM3', names: ['Drakenstein'] }],
  'region:za-swartland': [{ src: 'ZAF-ADM3', names: ['Swartland'] }],
  'region:za-robertson': [{ src: 'ZAF-ADM3', names: ['Langeberg'] }],
  'region:za-walker-bay': [{ src: 'ZAF-ADM3', names: ['Overstrand'] }],
  'region:za-worcester': [{ src: 'ZAF-ADM3', names: ['Breede Valley'] }],
  'region:za-cape-town': [{ src: 'ZAF-ADM3', names: ['City of Cape Town'] }],
  'region:za-elgin': [{ src: 'ZAF-ADM3', names: ['Theewaterskloof'] }],
  'region:za-elim': [{ src: 'ZAF-ADM3', names: ['Cape Agulhas'] }],
};

/** Regions whose outline is only an approximation of the official boundary. */
// Every South African outline is approximate, including regions drawn as the sum of their districts.
export const isApproximate = (id: string) => id.startsWith('region:za-');
export const APPROXIMATE = new Set(Object.keys(WORLD).filter(isApproximate));
