// Everything the app knows, gathered in one place. Add new files to the lists below.
import type { Grape, Region } from '../core/src/content.ts';
import { aromas } from './aromas.ts';
import { profiles } from './profiles.ts';
import { france } from './regions/france.ts';
import cabernetFranc from './grapes/cabernet-franc.ts';
import cabernetSauvignon from './grapes/cabernet-sauvignon.ts';
import chardonnay from './grapes/chardonnay.ts';
import gamay from './grapes/gamay.ts';
import merlot from './grapes/merlot.ts';
import pinotNoir from './grapes/pinot-noir.ts';
import sauvignonBlanc from './grapes/sauvignon-blanc.ts';
import semillon from './grapes/semillon.ts';

export const grapes: Grape[] = [cabernetFranc, cabernetSauvignon, chardonnay, gamay, merlot, pinotNoir, sauvignonBlanc, semillon];
export const regions: Region[] = [...france];
export { aromas, profiles };
