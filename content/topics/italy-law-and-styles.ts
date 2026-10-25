// Study notes: Italian wine law, ageing rules and the Veneto drying methods. Condensed from the
// user's Italy notes, in our own words. Check against the course book, then set verified: true.
import type { Topic } from '../../core/src/content.ts';

export default {
  id: 'topic:italy-law-and-styles',
  title: 'Italy: labels, ageing rules and passito',
  chapter: 'Italy',
  summary:
    'Italy uses DOC and DOCG for PDO wine and IGT for PGI. Classico marks the original zone, Riserva longer ageing; the big reds have minimum ageing before release, and the Veneto concentrates wines by drying grapes.',
  sections: [
    {
      heading: 'Categories',
      points: [
        'PDO is DOP in Italian, but labels mostly show the traditional terms: DOC (set area, grapes and methods) and DOCG (all DOC rules plus stricter ones, and in most cases bottled in the area).',
        'PGI is IGP, but the older term IGT is more common, e.g. Toscana IGT, Veneto IGT, Puglia IGT, Terre Siciliane IGT.',
        'Super Tuscans showed that great wine could sit outside the PDO rules; many are still Toscana IGT, though Bolgheri and Maremma Toscana DOC now allow all-international blends.',
      ],
      links: ['region:it', 'topic:wine-law-and-labelling', 'region:it-tuscany-bolgheri'],
    },
    {
      heading: 'Classico and Riserva',
      points: [
        'Classico: many appellations grew beyond their historic area. Classico wines come only from the original zone and include many of the best (Soave Classico, Valpolicella Classico, Chianti Classico).',
        'Chianti Classico is its own DOCG, not a sub-zone of Chianti DOCG. Chianti’s seven sub-zones (e.g. Rufina, Colli Senesi) may add their name to the label.',
        'Riserva: higher minimum alcohol and longer ageing than the basic wine.',
      ],
      links: ['region:it-tuscany-chianti', 'region:it-tuscany-chianti-classico', 'region:it-veneto-soave'],
    },
    {
      heading: 'Ageing rules to know',
      points: [
        'Barolo DOCG: 100% Nebbiolo; at least 38 months, 18 in wood; released from 1 January of the fourth year after harvest. Riserva: at least 62 months.',
        'Barbaresco DOCG: at least 26 months, 9 in wood; released from 1 January of the third year. Riserva: at least 50 months.',
        'Brunello di Montalcino DOCG: 100% Sangiovese; at least 2 years in wood; released from 1 January of the fifth year. Declassified: Rosso di Montalcino DOC.',
        'Vino Nobile di Montepulciano DOCG: Sangiovese plus permitted grapes; at least 2 years’ ageing. Declassified: Rosso di Montepulciano DOC.',
        'Chianti Classico: 12 months before release; Riserva 24 months (3 in bottle); Gran Selezione: single estate, 6 months more than Riserva. No oak rule, though most see oak.',
      ],
      causes: [{ factor: 'Long minimum ageing for high-tannin grapes', effect: 'tannins soften before release', result: 'wines closer to drinkable, with tertiary notes starting' }],
      links: ['region:it-piemonte-barolo', 'region:it-piemonte-barbaresco', 'region:it-tuscany-brunello-di-montalcino', 'region:it-tuscany-vino-nobile-di-montepulciano'],
    },
    {
      heading: 'Village and vineyard names in Piemonte',
      points: [
        'Barolo is often a blend of villages; a single village can be named, e.g. Barolo Serralunga d’Alba.',
        'The best wines come from named vineyards (crus), e.g. Barolo Cannubi. Barbaresco works the same way.',
        'Other grapes from these hills (Dolcetto, Barbera) go out as Alba DOC or Langhe DOC.',
        'Many Piemonte names are grape plus town: Barbera d’Asti DOCG, Barbera d’Alba DOC, Dolcetto d’Alba DOC.',
      ],
      links: ['region:it-piemonte-langhe', 'region:it-piemonte-barbera-d-asti'],
    },
    {
      heading: 'Passito and ripasso (Veneto)',
      points: [
        'Passito: grapes picked early (high acid), dried indoors to concentrate sugar and flavour, fermented in winter. Adds structure, flavour and, for reds, colour.',
        'Amarone della Valpolicella DOCG: fermented dry or off-dry; full body, high alcohol, medium to high tannin, intense red berry and spice; at least 14% abv; usually aged in large casks.',
        'Recioto della Valpolicella DOCG and Recioto di Soave DOCG: so sweet that fermentation stops on its own; sweet, full, red or white.',
        'Ripasso: Amarone is drained off its skins just before fermentation ends; finished Valpolicella goes onto those unpressed skins, and their leftover sugar ferments, adding colour, flavour and tannin. Valpolicella Ripasso DOC: medium to full, stewed cherry and plum.',
      ],
      causes: [
        { factor: 'Drying grapes for months', effect: 'water evaporates, sugar and flavour concentrate', result: 'Amarone and Recioto' },
        { factor: 'Refermenting on Amarone skins', effect: 'extra extraction and a little more alcohol', result: 'Ripasso sits between Valpolicella and Amarone' },
      ],
      links: ['region:it-veneto-valpolicella', 'region:it-veneto-amarone-della-valpolicella', 'grape:corvina', 'topic:sweet-winemaking'],
    },
    {
      heading: 'Vineyards: pergola and bush vines',
      points: [
        'North: high-yielding vines at low density on pergolas: canopy overhead, grapes hanging below in shade with good airflow, so less sunburn and rot.',
        'Pergolas are kept where high acid and low sugar are wanted (sparkling base) and for grapes to be dried, which must be healthy; elsewhere denser VSP plantings now dominate.',
        'South: traditionally low bush vines shaded by their own leaves; old vines remain, but cordon training on trellises is now usual and allows machines on Puglia’s plain.',
      ],
      links: ['topic:vineyard-management', 'region:it-puglia'],
    },
  ],
  verified: false,
} satisfies Topic;
