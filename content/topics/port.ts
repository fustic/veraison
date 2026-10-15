// Theory: Port. Drafted from general WSET Level 3 knowledge, in our own words.
// Check against the course book, then set verified: true.
import type { Topic } from '../../core/src/content.ts';

export default {
  id: 'topic:port',
  title: 'Port',
  chapter: 'Fortified wines',
  summary: 'Black grapes from the hot Douro valley are fermented briefly with intense extraction, then fortified to stop fermentation. Ruby styles keep fruit; tawny styles age oxidatively in small casks.',
  sections: [
    {
      heading: 'The Douro',
      points: [
        'Hot, dry, continental valley sheltered from the Atlantic by mountains; gets hotter and drier further east (Baixo Corgo, Cima Corgo, Douro Superior).',
        'Schist soils on steep terraces; schist splits vertically so roots reach water.',
        'Main grapes: Touriga Nacional, Touriga Franca, Tinta Roriz (Tempranillo), Tinta Barroca, Tinto Cão — thick-skinned and rich in colour and tannin.',
      ],
      links: ['region:pt-douro', 'grape:touriga-nacional', 'grape:touriga-franca', 'grape:tempranillo'],
    },
    {
      heading: 'Making Port',
      points: [
        'Fermentation lasts only two or three days, so extraction must be fast and intense: foot treading in stone lagares, robotic lagares or autovinifiers.',
        'At about 6–9% abv the wine is drained onto grape spirit (about 77% abv), roughly 1 part spirit to 4 parts wine, giving 19–22% abv and plenty of sugar.',
        'Traditionally aged in Vila Nova de Gaia, cooler and more humid than the Douro.',
      ],
      causes: [
        { factor: 'Fortification after two or three days', effect: 'fermentation stops with sugar left', result: 'sweet, high-alcohol wine' },
        { factor: 'Short time on skins', effect: 'needs vigorous extraction', result: 'treading and lagares to get colour and tannin quickly' },
      ],
    },
    {
      heading: 'Ruby styles (fruit kept)',
      points: [
        'Aged in large vats with little oxygen: deep colour and black-fruit flavours.',
        'Ruby: young, simple, fruity. Reserve: better quality, aged a little longer.',
        'Late Bottled Vintage (LBV): one year, bottled 4–6 years after harvest; usually filtered and ready to drink.',
        'Vintage Port: only in declared years, bottled after about 2 years, unfiltered; needs decades in bottle and decanting. Single Quinta Vintage: one estate, often in undeclared years.',
        'Crusted: a blend of years, bottled unfiltered, throws a sediment.',
      ],
      causes: [{ factor: 'Bottle ageing of unfiltered Vintage Port', effect: 'slow, reductive development', result: 'fruit with dried fruit, spice and a heavy sediment' }],
    },
    {
      heading: 'Tawny styles (oxidative)',
      points: [
        'Aged in small casks (pipes, about 550 L) for years: colour fades to amber, flavours turn to nuts, caramel and dried fruit.',
        'Basic Tawny is a lighter, cheaper blend; age-indicated Tawnies are 10, 20, 30 or 40 Year Old (an average style, not a minimum).',
        'Colheita: tawny from one year, at least 7 years in wood.',
        'White Port (often served with tonic) and Rosé Port are also made.',
      ],
      causes: [{ factor: 'Years in small casks', effect: 'slow oxidation, evaporation', result: 'amber colour, walnut, toffee and dried fruit; ready to drink when bottled' }],
    },
  ],
  verified: false,
} satisfies Topic;
