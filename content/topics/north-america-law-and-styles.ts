// Study notes: US and Canadian wine law and the key climate ideas. Condensed from the user's
// notes, in our own words. Check against the course book, then set verified: true.
import type { Topic } from '../../core/src/content.ts';

export default {
  id: 'topic:north-america-law-and-styles',
  title: 'USA and Canada: labels and climate',
  chapter: 'USA and Canada',
  summary:
    'The US uses AVAs: areas drawn by geography, not quality, of any size, which can overlap. Canada uses VQA in Ontario and British Columbia. In California the cold ocean, not latitude, sets the climate; in Canada lakes make Icewine country possible.',
  sections: [
    {
      heading: 'USA: AVAs and labels',
      points: [
        'The AVA (American Viticultural Area) is the US geographical indication.',
        'Sizes vary hugely: Rutherford is a small part of Napa; Central Coast runs from San Francisco to Santa Barbara.',
        'AVAs can cross state lines and overlap: Sta. Rita Hills lies mostly inside Santa Ynez Valley.',
        'Federal law sets minimum percentages for a grape, vintage or AVA named on the label; states may set their own, different rules.',
        'Wines without an AVA can name a state (California) or county (Napa County); the rules for vintage and origin are looser.',
      ],
      links: ['region:us', 'topic:wine-law-and-labelling', 'region:us-sta-rita-hills', 'region:us-central-coast'],
    },
    {
      heading: 'California: what sets the climate',
      points: [
        'Latitude matters little; the very cold California Current matters most.',
        'Coastal mountains block the ocean; where gaps open, cold air and fog pour in each evening and burn off late in the morning.',
        'Valleys at right angles to the coast funnel cold air far inland (Monterey, Santa Barbara). With no ocean exposure (Central Valley) it is hot.',
        'No rain in the ripening season: drip irrigation, and long hang time for very ripe, high-sugar grapes; many now pick earlier for freshness.',
      ],
      causes: [
        { factor: 'Fog and ocean air through gaps in the coast range', effect: 'cool nights and mornings', result: 'Pinot Noir and Chardonnay near the sea, Cabernet further inland' },
        { factor: 'Dry autumns', effect: 'grapes can hang late', result: 'ripe, concentrated, high-alcohol wines' },
      ],
      links: ['region:us-california', 'region:us-monterey', 'region:us-santa-maria-valley', 'region:us-central-valley'],
    },
    {
      heading: 'Napa: floor, slopes and aspect',
      points: [
        'South to north on the floor: cool Carneros (Pinot, Chardonnay, sparkling) → Stags Leap, Yountville, Oakville, Rutherford (Cabernet) → hottest St. Helena and Calistoga.',
        'Valley sides sit above the fog and are cooled by altitude. West-facing (Howell Mountain, Atlas Peak) is warmer than east-facing (Diamond Mountain, Spring Mountain, Mt. Veeder).',
        'Mountain reds: more tannin, less richness than the floor. Mountain Chardonnay: citrus and stone fruit, higher acidity.',
      ],
      links: ['region:us-napa-valley', 'region:us-los-carneros', 'region:us-napa-rutherford', 'region:us-napa-howell-mountain'],
    },
    {
      heading: 'Pacific North-West and New York',
      points: [
        'Oregon (west of the Cascades): Willamette Valley Pinot Noir, ripe red fruit, cinnamon, high acid; Southern Oregon is warmer and grows Cabernet and Syrah too.',
        'Washington (east of the Cascades): rain shadow, river irrigation, long sunny days, cool nights; winter freeze can halve the crop. Plummy Merlot, age-worthy Cabernet, dry Riesling.',
        'New York: mostly American and hybrid vines for their winter hardiness; Finger Lakes lakes store heat into November, giving perfumed Riesling.',
      ],
      links: ['region:us-willamette-valley', 'region:us-columbia-valley', 'region:us-finger-lakes'],
    },
    {
      heading: 'Canada: VQA and Icewine',
      points: [
        'VQA (Vintners Quality Alliance) is used in Ontario and British Columbia, each with appellations and sub-appellations.',
        'A VQA wine uses 100% grapes from its province, and 100% vinifera or approved hybrids.',
        'Hot July and August days, but long freezing winters; large lakes soften the extremes and make the season longer.',
        'Icewine: grapes frozen on the vine are pressed while frozen, so only sweet concentrated juice runs. Riesling gives the finest (acidity, aroma); Vidal is hardier and richer but less complex.',
        'Niagara Peninsula (Ontario) and Okanagan Valley (British Columbia) are the key appellations.',
      ],
      causes: [{ factor: 'Lake Ontario warms and cools more slowly than land', effect: 'longer autumn, later budburst', result: 'full ripening and less spring frost damage' }],
      links: ['region:ca', 'region:ca-niagara-peninsula', 'region:ca-okanagan-valley', 'grape:vidal', 'topic:sweet-winemaking'],
    },
  ],
  verified: false,
} satisfies Topic;
