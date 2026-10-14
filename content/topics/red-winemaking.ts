// Study notes: red winemaking. Condensed from the user's own notes, in our own words.
// Check against the course book, then set verified: true.
import type { Topic } from '../../core/src/content.ts';

export default {
  id: 'topic:red-winemaking',
  title: 'Red winemaking',
  chapter: 'Winemaking',
  summary:
    'Colour and tannin live in the skins, so reds ferment with them. Most choices are about how much colour, flavour and tannin to extract, and when.',
  sections: [
    {
      heading: 'How it differs from white',
      points: [
        'Black grapes ferment together with their skins to pick up colour, flavour and tannin.',
        'So pressing comes after fermentation, not before, and there are many more choices before, during and after it.',
        'Malolactic conversion is standard for reds; for whites it is a style choice.',
        'Nearly all fruit is destemmed and crushed first. Whole bunches are the exception (see below).',
      ],
      causes: [{ factor: 'Fermenting on the skins', effect: 'colour, flavour and tannin dissolve into the wine', result: 'the structure of a red' }],
      links: ['topic:white-winemaking'],
    },
    {
      heading: 'Before fermentation: cold soak',
      points: [
        'Crushed grapes can be held cool for a while before fermentation starts (cold maceration or cold soak).',
        'It extracts colour and flavour. Tannin dissolves far better in alcohol, so little comes out at this stage.',
      ],
      causes: [{ factor: 'Cold soak before fermentation', effect: 'colour and flavour extracted while there is no alcohol', result: 'deeper colour without extra tannin' }],
    },
    {
      heading: 'Fermentation temperature',
      points: [
        'Reds ferment at about 20–32 °C, warmer than whites, to help extraction.',
        'Above about 35 °C the yeast may die.',
        'Temperature steers extraction. Cooling the vat near the end limits tannin pickup, even though rising alcohol makes tannin easier to extract.',
      ],
      causes: [
        { factor: 'Warmer fermentation', effect: 'more colour, flavour and tannin extracted', result: 'deeper, more structured wine' },
        { factor: 'Cooling at the end of fermentation', effect: 'less tannin extracted as alcohol rises', result: 'softer tannins' },
      ],
    },
    {
      heading: 'Cap management',
      points: [
        'Skins and pulp float up into a thick cap. Left floating, it gives up little, so it is worked back into the juice.',
        'Extraction is set by the technique, how long it runs and how many times a day. Techniques are often combined or switched during fermentation.',
        'Punching down: pushing the cap under, by hand with paddles or mechanically. Very extractive; too hard or too often, especially late on, gives bitter, astringent wine. By hand it carried a CO₂ risk for workers.',
        'Pumping over: juice drawn from the bottom of the vat and pumped over the cap. Also cools the vat and adds oxygen.',
        'Rack and return: all the juice drained into another vessel, then poured back over the cap. Very extractive, so usually only once or twice; good for cooling.',
        'Rotary fermenters: horizontal tanks that turn, keeping skins and juice in constant contact.',
      ],
      causes: [
        { factor: 'Punching down late in fermentation', effect: 'tannin extracts most easily in alcohol', result: 'risk of bitter, astringent wine' },
        { factor: 'Pumping over or rack and return', effect: 'juice moved and exposed to air', result: 'extraction plus cooling and oxygen' },
      ],
    },
    {
      heading: 'Fermentation vessels',
      points: [
        'Large vessels, often open-topped so the cap can be worked: oak, concrete or stainless steel.',
        'Barrels are impractical for reds: the skins cannot be kept in contact with the juice.',
      ],
    },
    {
      heading: 'After fermentation',
      points: [
        'Post-fermentation maceration keeps the wine on its skins for more tannin. How long depends on the style; very long macerations can make tannins smoother.',
        'The free-run wine is drained off, then the skins are pressed: press wine.',
        'Early press wine is close to free run; later fractions are darker and more tannic. They can be kept apart and blended back to adjust colour and tannin.',
      ],
      causes: [
        { factor: 'Post-fermentation maceration', effect: 'more tannin extracted', result: 'firmer structure; very long ones can smooth tannins' },
        { factor: 'Later press fractions', effect: 'deeper colour, more tannin', result: 'used to build structure in the blend' },
      ],
    },
    {
      heading: 'Whole-bunch fermentation',
      points: [
        'Some or all of the fruit goes into the vat uncrushed. The stems must be ripe, or their tannins taste bitter.',
        'Kept away from oxygen, whole berries make a little alcohol inside their cells without yeast (intracellular fermentation) and form distinctive fruity aromas.',
        'Carbonic maceration: only whole bunches, vat filled with CO₂. At about 2% alcohol the skins split; the grapes are pressed and yeast finish the fermentation off the skins.',
        'Carbonic taste: colour but little tannin. Soft and fruity, with kirsch, banana, bubblegum and cinnamon-like spice.',
        'Semi-carbonic: whole bunches without added CO₂. Grapes at the bottom are crushed by the weight above, ambient yeast ferment that juice, and its CO₂ protects the intact berries, which go carbonic. Then pressed and finished off the skins.',
        'Premium Pinot Noir variant: the whole bunches are punched down bit by bit over the first days and fermentation finishes on the skins. Carbonic notes blend better with the varietal fruit; fresher fruit.',
        'Whole bunches with crushed fruit: the crushed grapes keep the bunches submerged, so they ferment inside the berries, and are broken up by punching down. More whole bunches means more carbonic character; silkier texture, brighter fruit.',
      ],
      causes: [
        { factor: 'Whole berries without oxygen', effect: 'intracellular fermentation', result: 'distinctive fruity aromas' },
        { factor: 'Carbonic maceration', effect: 'colour extracted, very little tannin', result: 'soft, fruity wine with kirsch, banana and bubblegum' },
        { factor: 'Unripe stems in the vat', effect: 'green stem tannins', result: 'bitter taste, so only ripe stems are used' },
      ],
      links: ['grape:gamay', 'region:fr-beaujolais', 'grape:pinot-noir'],
    },
    {
      heading: 'Maturation, blending and clarification',
      points: [
        'The big maturation decision is oak or no oak: barrels, or staves and chips in an inert vessel.',
        'Almost every red goes through MLC. Their stronger flavours gain less from long lees ageing than whites do.',
        'Fewer producers now use only small new barrels; many mix barrel ages and larger sizes for subtler, better-integrated oak. Top wines still get more new oak, for longer, because their concentrated fruit can carry it.',
        'Blending: grape varieties (colour, body, tannin, acidity, flavour), press wine into free run, wines from different oak (age, size, toast), or oaked with unoaked wine for a lighter oak touch.',
        'Most reds are fined and/or filtered. Some producers skip it, believing it strips structure. Long maturation clears wine naturally as sediment settles.',
      ],
      causes: [
        { factor: 'Concentrated, high-quality fruit', effect: 'can carry new-oak flavours', result: 'the best wines get more new oak for longer' },
        { factor: 'Blending oaked with unoaked wine', effect: 'dilutes the oak flavours', result: 'subtler oak influence' },
      ],
    },
    {
      heading: 'High-volume, inexpensive reds',
      points: [
        'Grown in warm, sunny, dry regions. Cabernet Sauvignon, Merlot, Syrah and Grenache suit them, and their skins give enough colour and fruit even at high yields.',
        'Pinot Noir is rarely used: hard to grow, likes cool climates, and gives too little colour and tannin at high yields.',
        'Next to premium versions: less colour, lighter tannin, simpler aromas. Varietal character fades, so wines can taste alike. Single variety or blend, sometimes labelled by style ("fruity red").',
        'Target style: fruity, low tannin. Handled protectively with SO₂ checked throughout; destemmed and crushed; tartaric acid often added in hot regions. Cold soak only if vat space allows.',
        'Commercial yeast at about 22–25 °C for fresh fruit; static or rotary vessels; cap worked lightly. No post-fermentation maceration (vat time, unwanted tannin). For more structure, macerate a small batch and blend it in.',
        'Carbonic or semi-carbonic maceration also gives this style; common for inexpensive Grenache and basic Beaujolais.',
        'Maturation: stainless steel for pure fruit, a few months in second- or third-fill barrels to soften tannin and add spice, or staves and chips in the tank for quick toasty notes.',
        'Stabilised, fined and sterile filtered so they are bright with no sediment. SO₂ topped up at bottling, even though shelf life is short.',
      ],
      causes: [
        { factor: 'Lots of colour and flavour in the skins', effect: 'still fruity and coloured at high yields', result: 'Cabernet, Merlot, Syrah and Grenache suit volume wine' },
        { factor: 'Hot growing climate', effect: 'low natural acidity', result: 'tartaric acid added' },
        { factor: 'Thin-skinned Pinot Noir at high yields', effect: 'too little colour and tannin', result: 'rarely used for inexpensive wine' },
      ],
      links: ['grape:cabernet-sauvignon', 'grape:merlot', 'grape:syrah', 'grape:grenache', 'grape:pinot-noir'],
    },
    {
      heading: 'Premium reds, grape by grape',
      points: [
        'Cabernet Sauvignon: destemmed (stems taste green), cold soak for colour, 26–30 °C, gentler extraction near the end, post-fermentation maceration to soften tannin. Lots of new French barriques, typically 12–18 months. Blended with Merlot (Shiraz in Australia).',
        'Merlot: made like Cabernet, but its softer skins need less extraction. New oak suits its plum fruit; 12–18 months is common.',
        'Pinot Noir: destemmed with a cold soak, or partly whole bunch. Ferments often go above 30 °C. Little post-fermentation maceration. 12–24 months in mostly used barrels; rarely blended with other grapes.',
        'Syrah/Shiraz: powerful style from vigorous extraction of ripe grapes plus new oak; restrained style from earlier picking, gentle extraction, some whole bunches, long post-fermentation maceration and larger, older barrels.',
        'Grenache: destemmed, cold soak, sometimes whole bunches; open-top steel or concrete; gentle punching down; usually drained at the end. Large old oak, since new oak swamps its fruit; usually blended.',
      ],
      links: ['grape:cabernet-sauvignon', 'grape:merlot', 'grape:pinot-noir', 'grape:syrah', 'grape:grenache'],
    },
  ],
  verified: false,
} satisfies Topic;
