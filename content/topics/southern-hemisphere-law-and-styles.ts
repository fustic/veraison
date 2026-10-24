// Study notes: labelling systems and key climate ideas for Chile, Argentina, South Africa,
// Australia and New Zealand. Condensed from the user's notes, in our own words.
// Check against the course book, then set verified: true.
import type { Topic } from '../../core/src/content.ts';

export default {
  id: 'topic:southern-hemisphere-law-and-styles',
  title: 'Southern Hemisphere: labels and key ideas',
  chapter: 'Southern Hemisphere',
  summary:
    'Each country has its own GI ladder and its own cooling trick: Chile’s cold current and the Andes, Argentina’s altitude, South Africa’s Benguela Current and Cape Doctor, Australia’s oceans and hills, New Zealand’s maritime isolation.',
  sections: [
    {
      heading: 'Chile',
      points: [
        'DOs: six regional DOs, four matter (Coquimbo, Aconcagua, Central Valley, Southern Region), split into 13 main sub-regions that mostly follow valleys from the Andes to the sea; many contain several zones.',
        'Since 2012, optional terms by distance from the coast: Costa, Entre Cordilleras, Andes, added to the DO.',
        'Reserva, Reserva Especial, Reserva Privada, Gran Reserva: loosely defined; mainly show a producer’s own range.',
        'Two cooling forces: the Humboldt Current with wind and fog up the valleys, and cold air from the Andes at night. El Niño brings rain, La Niña drought.',
      ],
      causes: [{ factor: 'Climate changes with distance from the sea, not latitude', effect: 'coastal, central and Andean sites differ in one valley', result: 'the Costa / Entre Cordilleras / Andes terms' }],
      links: ['region:cl', 'region:cl-casablanca-valley', 'region:cl-maipo-valley'],
    },
    {
      heading: 'Argentina',
      points: [
        'GIs: three broad regions (only Patagonia often seen), then provinces, departments and districts, and sometimes smaller GIs.',
        'A GI on the label means 100% of the grapes come from it.',
        'Altitude is the cooling factor: most vineyards above 600 m, up to 3,000 m in Salta. Patagonia is the exception, cooled by latitude at about 200 m.',
        'Desert oases irrigated from the Andes; parral pergolas shade grapes (still used for Torrontés); hail nets in Mendoza.',
      ],
      links: ['region:ar', 'region:ar-salta', 'region:ar-uco-valley', 'region:ar-patagonia', 'grape:malbec'],
    },
    {
      heading: 'South Africa',
      points: [
        'Wine of Origin (WO), with a certification seal on every bottle.',
        'Geographical unit → region → district → ward. Western Cape (the only important geographical unit) lets top producers blend across areas.',
        'Main regions: Coastal Region, Breede River Valley, Cape South Coast.',
        'Estate Wine: one estate, its own vineyards in one area, made and bottled on site. IPW is the voluntary sustainability scheme.',
        'Cooling: the cold Benguela Current, the Cape Doctor wind, and mountains (altitude, aspect, shade).',
      ],
      links: ['region:za', 'region:za-coastal-region', 'region:za-stellenbosch', 'grape:pinotage', 'grape:chenin-blanc'],
    },
    {
      heading: 'Australia',
      points: [
        'GIs: zones → regions → sub-regions. Zones can be a state (South Australia), several states (South Eastern Australia) or part of a state (Barossa).',
        'South Eastern Australia: the super-zone for multi-regional brands drawing on irrigated Riverland, Murray-Darling and Riverina, lifted with fruit from better regions.',
        'Regions must be distinct from their neighbours; sub-regions sit in one region, but a region can sit in several zones (Eden Valley → Barossa → South Australia → South Eastern Australia).',
        'Western Australia is outside South Eastern Australia.',
        'Hazards: drought (even the Murray runs low) and bush fires, whose smoke can taint grapes.',
      ],
      links: ['region:au', 'region:au-south-australia', 'region:au-eden-valley', 'region:au-riverland', 'region:au-western-australia'],
    },
    {
      heading: 'Australian signature styles',
      points: [
        'Hunter Semillon: picked early, no oak, no oxygen; light and neutral young, toast and honey after years.',
        'Clare and Eden Riesling: dry, high acid, lime; toast, honey and petrol quickly with age.',
        'Barossa Shiraz: full, soft, ripe black fruit with American oak; cooler Heathcote and Geelong give peppery Shiraz.',
        'Coonawarra Cabernet: terra rossa over limestone; cassis with mint or eucalyptus.',
      ],
      links: ['grape:semillon', 'grape:riesling', 'grape:syrah', 'region:au-coonawarra'],
    },
    {
      heading: 'New Zealand',
      points: [
        'GI scheme since 2017; a GI on the label needs at least 85% of grapes from that area.',
        'New Zealand, North Island and South Island are GIs, as are the main regions (e.g. Martinborough).',
        'Maritime everywhere except continental Central Otago; long sunshine and cool nights keep acidity.',
        'Warm North Island grows the black Bordeaux grapes and Syrah (Hawke’s Bay, Gimblett Gravels); the South Island is Sauvignon Blanc and Pinot Noir country.',
      ],
      links: ['region:nz', 'region:nz-marlborough', 'region:nz-hawkes-bay', 'region:nz-central-otago'],
    },
  ],
  verified: false,
} satisfies Topic;
