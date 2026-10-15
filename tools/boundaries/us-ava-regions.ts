// Which UC Davis AVA outlines (github.com/UCDavisLibrary/ava, CC0) make up each US study region.
// Regions not listed here match the AVA with their own name. A state-level region (STATE_OF)
// gets every single-state AVA of that state that is not inside another AVA (where its vineyards
// are), plus the multi-state AVAs listed in STATE_EXTRAS.

export const AVA_FOR_REGION: Record<string, string[]> = {
  'region:us-sonoma': ['Northern Sonoma', 'Sonoma Coast', 'Sonoma Valley', 'Petaluma Gap'],
  'region:us-napa-stags-leap-district': ['Stags Leap District'],
  'region:us-napa-oakville': ['Oakville'],
  'region:us-napa-rutherford': ['Rutherford'],
  'region:us-napa-howell-mountain': ['Howell Mountain'],
};

export const STATE_OF: Record<string, string> = {
  'region:us-california': 'CA',
  'region:us-oregon': 'OR',
  'region:us-washington': 'WA',
  'region:us-new-york': 'NY',
};

/** Multi-state AVAs that belong in a state's outline (Lake Erie, for example, is left out of New York). */
export const STATE_EXTRAS: Record<string, string[]> = {
  'region:us-washington': ['Columbia Valley', 'Columbia Gorge'],
  'region:us-oregon': ['Columbia Gorge'],
};
