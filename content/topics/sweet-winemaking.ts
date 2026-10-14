// Study notes: sweet winemaking. Condensed from the user's own notes, in our own words.
// Check against the course book, then set verified: true.
import type { Topic } from '../../core/src/content.ts';

export default {
  id: 'topic:sweet-winemaking',
  title: 'Sweet winemaking',
  chapter: 'Winemaking',
  summary:
    'Sweet wines keep unfermented sugar. Three routes: stop the fermentation, add something sweet, or concentrate the sugar in the grapes before fermentation.',
  sections: [
    {
      heading: 'Stopping the fermentation',
      points: [
        'Fortification: grape spirit kills the yeast; changes the wine’s whole balance (see fortified wines).',
        'High dose of SO₂ or chilling, then filter out the yeast. Keep yeast away afterwards or fermentation restarts.',
        'Used for premium German Kabinett and Spätlese, and sweet sparkling Asti.',
        'Wines made this way are low in alcohol.',
      ],
      causes: [{ factor: 'Chilling or SO₂ mid-fermentation', effect: 'yeast stop with sugar left', result: 'sweet, low-alcohol wine' }],
    },
    {
      heading: 'Adding a sweet component',
      points: [
        'Süssreserve: unfermented grape juice (kept from fermenting by filtering or SO₂) added to a dry wine before bottling. Common for medium-sweet German wines.',
        'RCGM (rectified concentrated grape must) does the same job, often in high-volume inexpensive wines.',
      ],
    },
    {
      heading: 'Concentrating the sugar in the grapes',
      points: [
        'All these methods concentrate acids and flavours along with the sugar.',
        'Fermentation then stops by itself when the yeast cannot cope with so much sugar, sometimes as low as about 7% abv (German Trockenbeerenauslese).',
      ],
    },
    {
      heading: 'Noble rot (Botrytis cinerea)',
      points: [
        'The same fungus as grey rot. Noble rot needs fully ripe grapes first, then humid misty mornings followed by dry, sunny afternoons.',
        'The fungus pierces the skin; afternoon sun evaporates water, concentrating sugar, acid and flavour; the fungus adds its own flavours.',
        'Taste: honey, apricot, citrus zest, dried fruit.',
        'Spread is uneven, so several hand pickings (tries) are needed: costly, skilled work. Conditions do not come every year; too damp gives grey rot instead.',
        'Examples: Sauternes, Tokaji, German and Austrian Beerenauslese and Trockenbeerenauslese. "Botrytised" on a label means noble rot.',
      ],
      causes: [
        { factor: 'Misty mornings, dry sunny afternoons', effect: 'noble rot develops but is held in check', result: 'shrivelled, concentrated grapes' },
        { factor: 'Botrytis on ripe grapes', effect: 'water lost, own flavours added', result: 'sweet wine with honey, apricot and zest, high acidity' },
      ],
      links: ['region:fr-bordeaux-sauternes', 'region:fr-bordeaux-barsac', 'grape:semillon', 'grape:riesling'],
    },
    {
      heading: 'Drying on the vine (passerillage)',
      points: [
        'After full ripeness, grapes left on the vine dehydrate towards raisins.',
        'Needs a warm, dry autumn, otherwise grey rot.',
        'Taste: over-ripe, dried and tropical fruit. Often labelled Late Harvest.',
      ],
    },
    {
      heading: 'Drying after picking',
      points: [
        'Healthy picked grapes dry and lose water, concentrating sugar.',
        'Needs warm, dry conditions; rotten grapes removed so rot cannot spread.',
        'Italian passito wines such as Recioto della Valpolicella DOCG. Raisiny character.',
      ],
    },
    {
      heading: 'Freezing on the vine',
      points: [
        'Healthy grapes hang into winter; at freezing, water in the pulp turns to ice.',
        'Pressed frozen: the ice stays in the press, so the juice is sugar-rich.',
        'Eiswein (Germany), Icewine (Canada). Very pure varietal character.',
        'Can be imitated by freezing picked grapes in the winery.',
      ],
      causes: [{ factor: 'Pressing frozen grapes', effect: 'ice stays behind', result: 'concentrated, pure, very sweet juice' }],
    },
  ],
  verified: false,
} satisfies Topic;
