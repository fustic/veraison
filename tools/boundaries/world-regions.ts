// Where the outlines for Australia, New Zealand, Chile, Argentina, South Africa and Canada come
// from, plus approximate outlines for sub-regions elsewhere that have no official GI shape.
// Used by tools/build-world-boundaries.ts. A region not listed here:
//   Australia: the Wine Australia GI region (or subregion) with the region's own name;
//   New Zealand: the IPONZ GI file named after the region (spaces → _, apostrophes dropped);
//   elsewhere, and when nothing matches: the combined outlines of the regions inside it.

/** One set of shapes: names from a source, optionally limited to one state or province. */
export type Pick =
  | { src: 'au-zone' | 'au-region' | 'au-subregion'; names?: string[]; state?: string; exclude?: string[] }
  | { src: 'nz'; names: string[] }
  /** geoBoundaries file `<ISO>-ADM<n>`; `within` keeps only shapes inside that ADM1 unit. */
  | { src: `${string}-ADM${number}`; names: string[]; within?: string; /** keep shapes centred in [w, s, e, n] */ box?: [number, number, number, number] };

const NIAGARA = ['Niagara-on-the-Lake', 'Lincoln', 'Grimsby', 'St. Catharines', 'Pelham', 'Niagara Falls', 'Thorold', 'West Lincoln'];
const OKANAGAN = ['Kelowna', 'West Kelowna', 'Lake Country', 'Peachland', 'Summerland', 'Penticton', 'Oliver', 'Osoyoos', 'Vernon', 'Coldstream', 'Central Okanagan', 'Central Okanagan J', 'Okanagan-Similkameen A', 'Okanagan-Similkameen C', 'Okanagan-Similkameen D', 'Okanagan-Similkameen E', 'Okanagan-Similkameen F', 'North Okanagan B', 'North Okanagan C'];

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

  'region:za-orange-river': [{ src: 'ZAF-ADM3', names: ['Dawid Kruiper', 'Kai Garib', 'Kheis'] }],

  // Canada: APPROXIMATE. VQA areas drawn as the census subdivisions (municipalities) that hold
  // the vineyards (geoBoundaries CAN ADM3).
  'region:ca-niagara-peninsula': [{ src: 'CAN-ADM3', names: NIAGARA, within: 'Ontario' }],
  'region:ca-ontario': [{ src: 'CAN-ADM3', names: [...NIAGARA, 'Prince Edward County', 'Essex', 'Kingsville', 'Leamington', 'Lakeshore', 'Amherstburg'], within: 'Ontario' }],
  'region:ca-okanagan-valley': [{ src: 'CAN-ADM3', names: OKANAGAN, within: 'British Columbia' }],
  'region:ca-british-columbia': [{ src: 'CAN-ADM3', names: [...OKANAGAN, 'Okanagan-Similkameen B', 'Okanagan-Similkameen G', 'Keremeos'], within: 'British Columbia' }],

  // Sub-regions with no official GI outline of their own: APPROXIMATE, drawn from the
  // municipalities (or counties) that make them up.
  'region:es-rioja-alavesa': [{ src: 'ESP-ADM3', names: ['Baños de Ebro/Mañueta', 'Elciego', 'Elvillar/Bilar', 'Kripan', 'Labastida/Bastida', 'Laguardia', 'Lanciego/Lantziego', 'Lapuebla de Labarca', 'Leza', 'Moreda de Álava/Moreda Araba', 'Navaridas', 'Oyón-Oion', 'Samaniego', 'Villabuena de Álava/Eskuernaga', 'Yécora/Iekora'], within: 'País Vasco/Euskadi' }],
  'region:es-rioja-alta': [{ src: 'ESP-ADM3', names: ['Haro', 'Briñas', 'Briones', 'San Vicente de la Sonsierra', 'Ábalos', 'Cenicero', 'Fuenmayor', 'Navarrete', 'Nájera', 'Uruñuela', 'Huércanos', 'Torremontalbo', 'Badarán', 'Cordovín', 'Alesanco', 'Azofra', 'Hormilla', 'Tricio', 'Arenzana de Abajo', 'Arenzana de Arriba', 'Camprovín', 'Ollauri', 'Rodezno', 'Gimileo', 'Casalarreina', 'Cuzcurrita de Río Tirón', 'Sajazarra', 'Tirgo', 'Villalba de Rioja', 'Zarratón', 'Anguciana', 'Sorzano', 'Entrena', 'Medrano', 'Lardero', 'Logroño', 'Hornos de Moncalvillo', 'Sotés', 'Ventosa', 'Alesón', 'Manjarrés', 'San Asensio', 'Hervías', 'Bañares', 'Albelda de Iregua', 'Alberite', 'Villamediana de Iregua', 'Nalda'], within: 'La Rioja' }],
  'region:es-rioja-oriental': [
    { src: 'ESP-ADM3', names: ['Agoncillo', 'Arrúbal', 'Alcanadre', 'Ausejo', 'Ocón', 'Galilea', 'Corera', 'El Redal', 'Murillo de Río Leza', 'Ribafrecha', 'Lagunilla del Jubera', 'Santa Engracia del Jubera', 'El Villar de Arnedo', 'Tudelilla', 'Pradejón', 'Calahorra', 'Autol', 'Quel', 'Arnedo', 'Bergasa', 'Herce', 'Aldeanueva de Ebro', 'Rincón de Soto', 'Alfaro', 'Grávalos', 'Cervera del Río Alhama', 'Igea'], within: 'La Rioja' },
    { src: 'ESP-ADM3', names: ['Andosilla', 'Azagra', 'Bargota', 'Mendavia', 'San Adrián', 'Sartaguda', 'Viana', 'Aras'], within: 'Comunidad Foral de Navarra' },
  ],
  // The EU dataset gives Valdeorras the wrong shapes; its eight municipalities instead.
  'region:es-valdeorras': [{ src: 'ESP-ADM3', names: ['O Barco de Valdeorras', 'A Rúa', 'Rubiá', 'Vilamartín de Valdeorras', 'Petín', 'Larouco', 'Carballeda de Valdeorras', 'O Bolo'], within: 'Galicia' }],
  'region:it-tuscany-chianti-rufina': [{ src: 'ITA-ADM4', names: ['Rufina', 'Pontassieve', 'Pelago', 'Londa', 'Dicomano'], within: 'Centro' }],
  'region:it-tuscany-chianti-colli-senesi': [{ src: 'ITA-ADM4', names: ['Asciano', 'Buonconvento', "Casole d'Elsa", "Castiglione d'Orcia", 'Cetona', 'Chianciano Terme', 'Chiusi', "Colle di Val d'Elsa", 'Montalcino', 'Montepulciano', 'Monteriggioni', "Monteroni d'Arbia", 'Murlo', 'Pienza', 'Poggibonsi', 'Rapolano Terme', 'San Gimignano', "San Quirico d'Orcia", 'Sarteano', 'Sinalunga', 'Sovicille', 'Torrita di Siena', 'Trequanda'], within: 'Centro' }],
  'region:pt-douro-baixo-corgo': [{ src: 'PRT-ADM2', names: ['Mesão Frio', 'Peso da Régua', 'Santa Marta de Penaguião'] }],
  'region:pt-douro-cima-corgo': [{ src: 'PRT-ADM2', names: ['Alijó', 'Sabrosa', 'Tabuaço', 'São João da Pesqueira'] }],
  'region:pt-douro-superior': [{ src: 'PRT-ADM2', names: ['Vila Nova de Foz Côa', 'Torre de Moncorvo', 'Freixo de Espada à Cinta'] }],
  'region:fr-south-west-cotes-de-gascogne': [{ src: 'FRA-ADM2', names: ['Gers'] }],
  'region:fr-champagne-montagne-de-reims': [{ src: 'FRA-ADM5', names: ['Verzenay', 'Verzy', 'Mailly-Champagne', 'Sillery', 'Puisieulx', 'Beaumont-sur-Vesle', 'Ambonnay', 'Bouzy', 'Val de Livre', 'Ludes', 'Chigny-les-Roses', 'Rilly-la-Montagne', 'Villers-Marmery', 'Trépail', 'Villers-Allerand', 'Sermiers', 'Écueil', 'Chamery', 'Ville-Dommange', 'Jouy-lès-Reims'], within: 'Grand Est', box: [3.7, 49.0, 4.4, 49.3] }],
  // Communes as of the dataset: Aÿ-Champagne includes Mareuil-sur-Aÿ, Blancs-Coteaux includes
  // Vertus and Oger, Val de Livre is Louvois and Tauxières-Mutry.
  'region:fr-champagne-vallee-de-la-marne': [{ src: 'FRA-ADM5', names: ['Aÿ-Champagne', 'Dizy', 'Hautvillers', 'Cumières', 'Damery', 'Champillon', 'Fleury-la-Rivière', 'Venteuil', 'Reuil', 'Châtillon-sur-Marne', 'Œuilly', 'Boursault', 'Vandières', 'Verneuil', 'Vincelles', 'Dormans', 'Troissy', 'Mareuil-le-Port', 'Leuvrigny', 'Festigny', 'Nesle-le-Repons'], within: 'Grand Est', box: [3.3, 48.95, 4.2, 49.3] }],
  'region:fr-champagne-cote-des-blancs': [{ src: 'FRA-ADM5', names: ['Cramant', 'Avize', 'Le Mesnil-sur-Oger', 'Chouilly', 'Cuis', 'Grauves', 'Blancs-Coteaux', 'Bergères-lès-Vertus', 'Monthelon', 'Moussy', 'Pierry'], within: 'Grand Est', box: [3.8, 48.85, 4.1, 49.1] }],
  'region:fr-champagne-cote-de-sezanne': [{ src: 'FRA-ADM5', names: ['Sézanne', 'Barbonne-Fayel', 'Saudoy', 'Vindey', 'Fontaine-Denis-Nuisy', 'Bethon', 'Montgenost', 'Villenauxe-la-Grande', 'Allemant', 'Broyes', 'Chantemerle'], within: 'Grand Est', box: [3.3, 48.5, 3.9, 48.85] }],
  'region:fr-champagne-cote-des-bar': [{ src: 'FRA-ADM5', names: ['Les Riceys', 'Celles-sur-Ource', 'Neuville-sur-Seine', 'Buxeuil', 'Polisot', 'Polisy', 'Gyé-sur-Seine', 'Courteron', 'Mussy-sur-Seine', 'Essoyes', 'Loches-sur-Ource', 'Landreville', 'Bar-sur-Seine', 'Urville', 'Bligny', 'Colombé-le-Sec', 'Baroville', 'Bar-sur-Aube', 'Bergères', 'Arrentières', 'Fontaine', 'Meurville', 'Spoy', 'Proverville', 'Ville-sur-Arce', 'Avirey-Lingey', 'Bagneux-la-Fosse', 'Balnot-sur-Laignes', 'Merrey-sur-Arce', 'Chacenay', 'Noé-les-Mallets', 'Fontette', 'Vitry-le-Croisé', 'Éguilly-sous-Bois'], within: 'Grand Est', box: [4.0, 47.8, 5.0, 48.4] }],
  'region:nz-auckland': [{ src: 'NZL-ADM1', names: ['Auckland Region'] }],
  'region:us-central-valley': [{ src: 'USA-ADM2', names: ['Sacramento', 'San Joaquin', 'Stanislaus', 'Merced', 'Madera', 'Fresno', 'Kings', 'Tulare', 'Kern', 'Yolo', 'Sutter', 'Yuba', 'Colusa', 'Glenn', 'Butte', 'Tehama'], within: 'California' }],
};

/** Regions whose outline is only an approximation of the official boundary. */
// Approximate: every South African and Canadian outline (including regions drawn as the sum of
// their parts), and every outline built from municipalities in countries that have official GIs.
const OFFICIAL = ['region:au-', 'region:nz-', 'region:cl-', 'region:ar-'];
export const isApproximate = (id: string) =>
  id.startsWith('region:za-') || id.startsWith('region:ca-') || (id in WORLD && !OFFICIAL.some((p) => id.startsWith(p))) || id === 'region:nz-auckland';
export const APPROXIMATE = new Set(Object.keys(WORLD).filter(isApproximate));
