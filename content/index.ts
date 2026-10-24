// Everything the app knows, gathered in one place. Add new files to the lists below.
import type { Grape, Region, Topic } from '../core/src/content.ts';
import { aromas } from './aromas.ts';
import { profiles } from './profiles.ts';
import { austria, england, germany, greece, hungary, italy, portugal, spain } from './regions/europe.ts';
import { france } from './regions/france.ts';
import { argentina, australia, canada, chile, newZealand, southAfrica, usa } from './regions/new-world.ts';
import agiorgitiko from './grapes/agiorgitiko.ts';
import aglianico from './grapes/aglianico.ts';
import airen from './grapes/airen.ts';
import albarino from './grapes/albarino.ts';
import alfrocheiro from './grapes/alfrocheiro.ts';
import alicanteBouschet from './grapes/alicante-bouschet.ts';
import aligote from './grapes/aligote.ts';
import arinto from './grapes/arinto.ts';
import assyrtiko from './grapes/assyrtiko.ts';
import baga from './grapes/baga.ts';
import barbera from './grapes/barbera.ts';
import blaufrankisch from './grapes/blaufrankisch.ts';
import cabernetFranc from './grapes/cabernet-franc.ts';
import cabernetSauvignon from './grapes/cabernet-sauvignon.ts';
import carignan from './grapes/carignan.ts';
import carmenere from './grapes/carmenere.ts';
import chardonnay from './grapes/chardonnay.ts';
import cheninBlanc from './grapes/chenin-blanc.ts';
import cinsault from './grapes/cinsault.ts';
import cortese from './grapes/cortese.ts';
import corvina from './grapes/corvina.ts';
import dolcetto from './grapes/dolcetto.ts';
import encruzado from './grapes/encruzado.ts';
import fiano from './grapes/fiano.ts';
import friulano from './grapes/friulano.ts';
import furmint from './grapes/furmint.ts';
import gamay from './grapes/gamay.ts';
import garganega from './grapes/garganega.ts';
import gewurztraminer from './grapes/gewurztraminer.ts';
import glera from './grapes/glera.ts';
import godello from './grapes/godello.ts';
import graciano from './grapes/graciano.ts';
import grechetto from './grapes/grechetto.ts';
import greco from './grapes/greco.ts';
import grenache from './grapes/grenache.ts';
import grunerVeltliner from './grapes/gruner-veltliner.ts';
import loureiro from './grapes/loureiro.ts';
import malbec from './grapes/malbec.ts';
import malvasia from './grapes/malvasia.ts';
import marsanne from './grapes/marsanne.ts';
import melonBlanc from './grapes/melon-blanc.ts';
import mencia from './grapes/mencia.ts';
import merlot from './grapes/merlot.ts';
import montepulciano from './grapes/montepulciano.ts';
import mourvedre from './grapes/mourvedre.ts';
import mullerThurgau from './grapes/muller-thurgau.ts';
import muscadelle from './grapes/muscadelle.ts';
import muscat from './grapes/muscat.ts';
import nebbiolo from './grapes/nebbiolo.ts';
import negroamaro from './grapes/negroamaro.ts';
import nerelloMascalese from './grapes/nerello-mascalese.ts';
import neroDAvola from './grapes/nero-d-avola.ts';
import palomino from './grapes/palomino.ts';
import parellada from './grapes/parellada.ts';
import pedroXimenez from './grapes/pedro-ximenez.ts';
import petitVerdot from './grapes/petit-verdot.ts';
import pinotBlanc from './grapes/pinot-blanc.ts';
import pinotGris from './grapes/pinot-gris.ts';
import pinotMeunier from './grapes/pinot-meunier.ts';
import pinotNoir from './grapes/pinot-noir.ts';
import pinotage from './grapes/pinotage.ts';
import riesling from './grapes/riesling.ts';
import roussanne from './grapes/roussanne.ts';
import sagrantino from './grapes/sagrantino.ts';
import sangiovese from './grapes/sangiovese.ts';
import sauvignonBlanc from './grapes/sauvignon-blanc.ts';
import schiava from './grapes/schiava.ts';
import semillon from './grapes/semillon.ts';
import silvaner from './grapes/silvaner.ts';
import stLaurent from './grapes/st-laurent.ts';
import syrah from './grapes/syrah.ts';
import tannat from './grapes/tannat.ts';
import tempranillo from './grapes/tempranillo.ts';
import teroldego from './grapes/teroldego.ts';
import tintaBarroca from './grapes/tinta-barroca.ts';
import tintoCao from './grapes/tinto-cao.ts';
import torrontes from './grapes/torrontes.ts';
import tourigaFranca from './grapes/touriga-franca.ts';
import tourigaNacional from './grapes/touriga-nacional.ts';
import trebbiano from './grapes/trebbiano.ts';
import trincadeira from './grapes/trincadeira.ts';
import verdejo from './grapes/verdejo.ts';
import verdicchio from './grapes/verdicchio.ts';
import vidal from './grapes/vidal.ts';
import vermentino from './grapes/vermentino.ts';
import viognier from './grapes/viognier.ts';
import viura from './grapes/viura.ts';
import welschriesling from './grapes/welschriesling.ts';
import xarello from './grapes/xarello.ts';
import xinomavro from './grapes/xinomavro.ts';
import zinfandel from './grapes/zinfandel.ts';
import zweigelt from './grapes/zweigelt.ts';
import centralEuropeLaw from './topics/central-europe-law.ts';
import italyLawAndStyles from './topics/italy-law-and-styles.ts';
import iberiaLawAndStyles from './topics/iberia-law-and-styles.ts';
import northAmericaLawAndStyles from './topics/north-america-law-and-styles.ts';
import climateAndWeather from './topics/climate-and-weather.ts';
import franceClassifications from './topics/france-classifications.ts';
import madeiraAndVdn from './topics/madeira-and-vdn.ts';
import port from './topics/port.ts';
import sherry from './topics/sherry.ts';
import sparklingWinemaking from './topics/sparkling-winemaking.ts';
import sparklingWines from './topics/sparkling-wines.ts';
import storageServiceAndFood from './topics/storage-service-and-food.ts';
import vineyardManagement from './topics/vineyard-management.ts';
import winemakingBasics from './topics/winemaking-basics.ts';
import wineLawAndLabelling from './topics/wine-law-and-labelling.ts';
import redWinemaking from './topics/red-winemaking.ts';
import roseWinemaking from './topics/rose-winemaking.ts';
import sweetWinemaking from './topics/sweet-winemaking.ts';
import whiteWinemaking from './topics/white-winemaking.ts';

export const grapes: Grape[] = [
  agiorgitiko, aglianico, airen, albarino, alfrocheiro, alicanteBouschet, aligote, arinto, assyrtiko, baga, barbera, blaufrankisch, cabernetFranc, cabernetSauvignon, carignan, carmenere, chardonnay, cheninBlanc, cinsault, cortese, corvina, dolcetto, encruzado, fiano, friulano, furmint, gamay, garganega, gewurztraminer, glera, godello, graciano, grechetto, greco, grenache, grunerVeltliner, loureiro, malbec, malvasia, marsanne, melonBlanc, mencia, merlot, montepulciano, mourvedre, mullerThurgau, muscadelle, muscat, nebbiolo, negroamaro, nerelloMascalese, neroDAvola, palomino, parellada, pedroXimenez, petitVerdot, pinotBlanc, pinotGris, pinotMeunier, pinotNoir, pinotage, riesling, roussanne, sagrantino, sangiovese, sauvignonBlanc, schiava, semillon, silvaner, stLaurent, syrah, tannat, tempranillo, teroldego, tintaBarroca, tintoCao, torrontes, tourigaFranca, tourigaNacional, trebbiano, trincadeira, verdejo, verdicchio, vermentino, vidal, viognier, viura, welschriesling, xarello, xinomavro, zinfandel, zweigelt,
];
// In study order: the Study tab groups them by chapter in this order.
export const topics: Topic[] = [
  climateAndWeather, vineyardManagement,
  winemakingBasics, whiteWinemaking, redWinemaking, roseWinemaking, sweetWinemaking,
  sparklingWinemaking, sparklingWines,
  sherry, port, madeiraAndVdn,
  wineLawAndLabelling, franceClassifications, italyLawAndStyles, iberiaLawAndStyles, centralEuropeLaw, northAmericaLawAndStyles, storageServiceAndFood,
];
export const regions: Region[] = [
  ...france, ...italy, ...spain, ...portugal, ...germany, ...austria, ...hungary, ...greece, ...england,
  ...usa, ...canada, ...chile, ...argentina, ...southAfrica, ...australia, ...newZealand,
];
export { aromas, profiles };
