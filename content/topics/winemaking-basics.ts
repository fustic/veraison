// Theory: winemaking basics. Drafted from general WSET Level 3 knowledge, in our own words.
// Check against the course book, then set verified: true.
import type { Topic } from '../../core/src/content.ts';

export default {
  id: 'topic:winemaking-basics',
  title: 'Winemaking basics',
  chapter: 'Winemaking',
  summary: 'The tools every winemaker uses: yeast, temperature, oxygen, SO₂, vessels and oak, lees, MLC, blending, clarification and closures.',
  sections: [
    {
      heading: 'Fermentation and yeast',
      points: [
        'Yeast turn sugar into alcohol, CO₂ and heat, plus aroma compounds.',
        'Ambient (wild) yeast can add complexity but are less predictable; cultured yeast are reliable and chosen for style.',
        'Fermentation stops when sugar runs out, alcohol gets too high (about 15–16%), temperature is too high or low, or the winemaker stops it.',
      ],
      causes: [{ factor: 'Ambient yeast', effect: 'many strains, slower start', result: 'more complex but riskier fermentation' }],
    },
    {
      heading: 'Oxygen and sulfur dioxide',
      points: [
        'Protective winemaking keeps oxygen out (inert gas, cool temperatures, SO₂) to keep fresh primary fruit.',
        'Controlled oxygen softens tannins and adds complexity (barrels, racking, micro-oxygenation).',
        'SO₂ is an antioxidant and antiseptic: it protects against oxidation and microbes. Too much smells of struck matches.',
      ],
      causes: [
        { factor: 'Protective handling', effect: 'little oxygen contact', result: 'fresh, fruity, primary aromas' },
        { factor: 'Oxidative handling', effect: 'oxygen reacts with the wine', result: 'nutty, dried-fruit, softer wine' },
      ],
    },
    {
      heading: 'Vessels and oak',
      points: [
        'Inert vessels (stainless steel, concrete lined) add nothing; easy to clean and control temperature.',
        'Oak adds flavour (vanilla, toast, spice) and lets in a little oxygen, which softens tannin and adds complexity.',
        'Effect depends on size (small barriques 225 L give more), age (new gives most), toast level, and origin (French: subtle spice and toast; American: vanilla and coconut). Sizes run from the 225 L barrique to large foudres of 2,000 L or more; staves split and air-dried outdoors give gentler flavour than sawn, kiln-dried wood. Staves and chips in tanks are the cheap alternative.',
        'Oak staves or chips in tank are a cheap, quick way to add oak flavour without the oxygen effect.',
      ],
      causes: [
        { factor: 'Small new oak barrels', effect: 'high wood-to-wine contact', result: 'strong vanilla, toast and spice' },
        { factor: 'American oak', effect: 'more lactones', result: 'vanilla and coconut (classic Rioja)' },
      ],
      links: ['region:es-rioja', 'grape:tempranillo'],
    },
    {
      heading: 'Lees, MLC and blending',
      points: [
        'Lees are dead yeast; long contact adds texture and bready or creamy flavours; stirring (bâtonnage) strengthens the effect.',
        'Malolactic conversion: bacteria turn sharp malic acid into softer lactic acid, adding buttery notes. Standard for reds, a choice for whites.',
        'Blending improves balance, complexity and consistency: varieties, sites, vintages, vessels.',
      ],
      causes: [{ factor: 'Malolactic conversion', effect: 'malic becomes lactic acid', result: 'softer acidity, buttery notes' }],
    },
    {
      heading: 'Clarification, stabilisation and bottling',
      points: [
        'Clarification: settling and racking, fining (bentonite, egg white, gelatine, pea protein) to remove haze or harsh tannin, then filtration.',
        'Depth filtration removes larger particles; surface (membrane) filtration can remove yeast and bacteria (sterile filtration).',
        'Tartrate stabilisation (chilling) stops harmless crystals forming in bottle; protein stabilisation (bentonite) stops haze in whites.',
        'Closures: natural cork lets in a little oxygen but can carry TCA (cork taint); screwcaps keep fruit fresh and avoid taint; synthetic corks are cheap but less airtight.',
      ],
      causes: [{ factor: 'Sterile filtration', effect: 'removes yeast and bacteria', result: 'needed for wines with residual sugar or no MLC' }],
    },
  ],
  verified: false,
} satisfies Topic;
