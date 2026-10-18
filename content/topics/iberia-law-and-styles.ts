// Study notes: Spanish and Portuguese wine law, Spanish ageing terms and regional groupings.
// Condensed from the user's notes, in our own words. Check against the course book, then set verified: true.
import type { Topic } from '../../core/src/content.ts';

export default {
  id: 'topic:iberia-law-and-styles',
  title: 'Spain and Portugal: labels, ageing and regions',
  chapter: 'Spain and Portugal',
  summary:
    'Spain layers DO, DOCa and Vino de Pago over PGI Vino de la Tierra, and defines ageing terms from Joven to Gran Reserva. Portugal uses DOC and Vinho Regional; learn its five main DOCs and the big Vinho Regional areas.',
  sections: [
    {
      heading: 'Spain: categories',
      points: [
        'PDO is DOP, but labels mostly show the traditional terms.',
        'DO: rules on grapes, viticulture and area.',
        'DOCa: a DO of at least 10 years’ standing can apply for promotion. Only two: Rioja and Priorat (DOQ, the Catalan form).',
        'Vino de Pago (VP): a few single estates with high reputations; only their own grapes, made and aged on the estate. Most are in La Mancha.',
        'PGI: Vino de la Tierra (VdlT); Castilla y León is the largest. No GI: Vino.',
      ],
      links: ['region:es', 'topic:wine-law-and-labelling', 'region:es-rioja', 'region:es-priorat'],
    },
    {
      heading: 'Spain: ageing terms',
      points: [
        'Joven: no minimum ageing; in Rioja the term is Genérico.',
        'Crianza: red 24 months total, 6 in barrel; white and rosé 18 months total.',
        'Reserva: red 36 months, 12 in barrel; white and rosé 24 months, 6 in barrel.',
        'Gran Reserva: red 60 months, 18 in barrel; white and rosé 48 months, 6 in barrel. Only in exceptional vintages; whites and rosés rarely.',
        'These are national minimums; some regions (such as Rioja) ask for more, and many producers exceed them.',
      ],
      causes: [{ factor: 'Long barrel and bottle ageing', effect: 'oak flavours, then tertiary notes', result: 'vanilla and coconut (American oak) or spice (French) leading to leather and dried fruit' }],
      links: ['region:es-rioja', 'region:es-ribera-del-duero', 'grape:tempranillo'],
    },
    {
      heading: 'Spain: six groups of regions',
      points: [
        'Upper Ebro: Rioja, Navarra, Cariñena, Calatayud.',
        'Catalunya: Penedès, Priorat; DO Catalunya covers the whole region; nearly all Cava.',
        'Duero Valley: Ribera del Duero, Toro, Rueda.',
        'North West: Rías Baixas, Bierzo.',
        'Levante: Valencia, Jumilla, Yecla.',
        'Castilla-La Mancha: La Mancha, Valdepeñas.',
      ],
      links: ['region:es-penedes', 'region:es-rueda', 'region:es-rias-baixas', 'region:es-jumilla', 'region:es-la-mancha'],
    },
    {
      heading: 'Spain: the climate challenge',
      points: [
        'North and north-west: moderate, maritime, wet. East coast: warm Mediterranean, hotter further south. Meseta Central: hot continental, freezing winters, little rain.',
        'Everywhere but the north-west, heat and drought matter most; fungal disease is rare.',
        'Low-density bush vines give each vine more water and shade the grapes; wires are slowly being added for machine harvesting.',
        'High altitude (Ribera del Duero over 850 m) gives cool nights that keep acidity.',
      ],
      causes: [{ factor: 'Water stress on a hot plateau', effect: 'vines planted far apart and bush-trained', result: 'low yields per hectare even where vineyards are vast' }],
      links: ['topic:vineyard-management', 'region:es-ribera-del-duero'],
    },
    {
      heading: 'Portugal: categories and regions',
      points: [
        'PDO: DOP, but DOC is widely used. PGI: IGP, often shown as Vinho Regional. No GI: Vinho, which includes much simple, fruity off-dry rosé.',
        'The five main DOCs: Vinho Verde, Douro, Dão, Bairrada, Alentejo.',
        'Big Vinho Regional areas: Lisboa (largest by volume), Alentejano (wider than Alentejo DOC), Península de Setúbal and Tejo. Looser rules, more grapes, including international ones.',
        'The same grape may change name between regions: Tempranillo is Tinta Roriz in the north and Aragonês in the Alentejo; Mencía is Jaen in Dão; Albariño is Alvarinho.',
      ],
      links: ['region:pt', 'region:pt-vinho-verde', 'region:pt-douro', 'region:pt-dao', 'region:pt-bairrada', 'region:pt-alentejo'],
    },
    {
      heading: 'Vinho Verde alcohol rules',
      points: [
        'Classic white Vinho Verde: 8–11.5% abv, high acid, often a slight spritz; the lowest-alcohol wines are usually off-dry.',
        'With a grape, sub-region or quality term on the label: up to 14% abv.',
        'Vinho Verde Alvarinho: 100% Alvarinho from Monção e Melgaço, 11.5–14% abv, riper and more tropical.',
      ],
      links: ['region:pt-vinho-verde', 'grape:albarino', 'grape:loureiro'],
    },
  ],
  verified: false,
} satisfies Topic;
