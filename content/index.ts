// Everything the app knows, gathered in one place. Add new files to the lists below.
import type { Grape, Region, Topic } from '../core/src/content.ts';
import { aromas } from './aromas.ts';
import { profiles } from './profiles.ts';
import { france } from './regions/france.ts';
import cabernetFranc from './grapes/cabernet-franc.ts';
import cabernetSauvignon from './grapes/cabernet-sauvignon.ts';
import chardonnay from './grapes/chardonnay.ts';
import gamay from './grapes/gamay.ts';
import grenache from './grapes/grenache.ts';
import merlot from './grapes/merlot.ts';
import pinotGris from './grapes/pinot-gris.ts';
import pinotNoir from './grapes/pinot-noir.ts';
import riesling from './grapes/riesling.ts';
import sauvignonBlanc from './grapes/sauvignon-blanc.ts';
import semillon from './grapes/semillon.ts';
import syrah from './grapes/syrah.ts';
import redWinemaking from './topics/red-winemaking.ts';
import roseWinemaking from './topics/rose-winemaking.ts';
import sweetWinemaking from './topics/sweet-winemaking.ts';
import whiteWinemaking from './topics/white-winemaking.ts';

export const grapes: Grape[] = [cabernetFranc, cabernetSauvignon, chardonnay, gamay, grenache, merlot, pinotGris, pinotNoir, riesling, sauvignonBlanc, semillon, syrah];
export const topics: Topic[] = [whiteWinemaking, redWinemaking, roseWinemaking, sweetWinemaking];
export const regions: Region[] = [...france];
export { aromas, profiles };
