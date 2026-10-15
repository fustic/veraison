// Theory: wine law and labels. Drafted from general WSET Level 3 knowledge, in our own words.
// Check against the course book, then set verified: true.
import type { Topic } from '../../core/src/content.ts';

export default {
  id: 'topic:wine-law-and-labelling',
  title: 'Wine law and labels',
  chapter: 'Wine law and labelling',
  summary: 'Geographical indications tell you where a wine is from and which rules it follows. The EU has two levels (PDO and PGI); each country adds its own terms.',
  sections: [
    {
      heading: 'EU categories',
      points: [
        'PDO (Protected Designation of Origin): smaller areas, stricter rules on grapes, yields, methods and ageing.',
        'PGI (Protected Geographical Indication): larger areas, more freedom (varieties, yields).',
        'Wine without a GI can show variety and vintage (e.g. Vin de France).',
        'If a vintage, variety or region is on the label, at least 85% of the wine must match.',
      ],
    },
    {
      heading: 'Country terms',
      points: [
        'France: AOC / AOP (PDO), IGP (PGI, e.g. Pays d’Oc), Vin de France. Burgundy adds Premier Cru and Grand Cru; Bordeaux uses classifications such as the 1855 Médoc Crus Classés.',
        'Italy: DOCG and DOC (PDO), IGT (PGI). Classico = the historic heart; Superiore = higher alcohol or stricter rules; Riserva = longer ageing.',
        'Spain: DOCa (Rioja, Priorat), DO, Vino de Pago (single estate) for PDO; Vino de la Tierra for PGI.',
        'Germany: Qualitätswein and Prädikatswein (PDO), Landwein (PGI). Prädikat levels by grape sugar at harvest: Kabinett, Spätlese, Auslese, Beerenauslese, Trockenbeerenauslese, Eiswein.',
        'Austria: DAC for regional typicity; Portugal: DOC and Vinho Regional; Hungary: OEM.',
      ],
      links: ['region:fr', 'region:it', 'region:es', 'region:de', 'region:at'],
    },
    {
      heading: 'Ageing terms in Spain',
      points: [
        'Joven: little or no oak. Roble: some oak, not regulated as strictly.',
        'Red Crianza: at least 2 years of ageing, 6 months in oak (Rioja and Ribera del Duero: 1 year in oak).',
        'Red Reserva: at least 3 years, 1 in oak. Red Gran Reserva: at least 5 years, 18 months in oak (Rioja: 2 years in oak).',
      ],
      links: ['region:es-rioja', 'region:es-ribera-del-duero'],
    },
    {
      heading: 'Outside Europe',
      points: [
        'Most New World countries define geographical boundaries but few rules on grapes or yields.',
        'USA: AVAs; a variety on the label needs at least 75% of it; an AVA needs 85%; a vintage with an AVA needs 95%.',
        'Australia: GIs (zones, regions, sub-regions) and an 85% rule for variety, vintage and GI.',
        'South Africa: Wine of Origin (regions, districts, wards); New Zealand and Chile: GIs and DOs, with 85% rules.',
      ],
      links: ['region:us', 'region:au', 'region:za'],
    },
    {
      heading: 'Other label terms',
      points: [
        'Sweetness words: sec / trocken / seco (dry), demi-sec / halbtrocken / feinherb (off-dry to medium), moelleux, doux, dolce (sweet).',
        '"Old vines", "Reserve" and "Estate" have no legal meaning in most countries.',
        'Organic and biodynamic claims need certification.',
      ],
    },
  ],
  verified: false,
} satisfies Topic;
