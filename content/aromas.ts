// Aroma and flavour descriptors used by the tasting note, grape pages and profiles.
// Wording is our own general wine vocabulary; check it against your course lexicon.
// Icons reference the shared AromaIcon shapes (see the design canvas).

import type { AppliesTo, Aroma, AromaLevel } from '../core/src/content.ts';

type Item = [label: string, shape: string, c1: string, c2?: string, id?: string];

function cluster(level: AromaLevel, name: string, appliesTo: AppliesTo, items: Item[]): Aroma[] {
  return items.map(([label, shape, c1, c2, id]) => ({
    id: `aroma:${id ?? slug(label)}`,
    label,
    level,
    cluster: name,
    appliesTo,
    icon: c2 ? { shape, c1, c2 } : { shape, c1 },
  }));
}

export function slug(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export const aromas: Aroma[] = [
  // Primary: fruit and floral
  ...cluster('primary', 'Floral', 'both', [
    ['acacia', 'flower', '#F5F0DC', '#F2C94C'],
    ['honeysuckle', 'flower', '#F3E3A0', '#E8A33A'],
    ['chamomile', 'flower', '#FFFFFF', '#F2C94C'],
    ['elderflower', 'flower', '#F7F3E3', '#D9C66A'],
    ['geranium', 'flower', '#E0457B', '#F2C94C'],
    ['blossom', 'flower', '#F8C8D8', '#C2185B'],
    ['rose', 'flower', '#D7263D', '#9E1B32'],
    ['violet', 'flower', '#6A3D9A', '#F2C94C'],
  ]),
  ...cluster('primary', 'Green fruit', 'white', [
    ['apple', 'fruit', '#8DC63F'],
    ['gooseberry', 'berries', '#B5CF6B', '#8DA850'],
    ['pear', 'pear', '#C5D86D'],
    ['grape', 'berries', '#C9DB7A', '#9CB04E'],
    ['quince', 'pear', '#E8C547'],
  ]),
  ...cluster('primary', 'Citrus fruit', 'white', [
    ['grapefruit', 'citrus', '#F28C6A', '#F7B9A1'],
    ['lemon', 'citrus', '#F4D03F', '#FBE57D'],
    ['lime', 'citrus', '#7CB342', '#C5E1A5'],
    ['orange peel', 'citrus', '#F39C12', '#FAD7A0'],
    ['lemon peel', 'citrus', '#E9C230', '#F7E08A'],
  ]),
  ...cluster('primary', 'Stone fruit', 'white', [
    ['peach', 'fruit', '#F4A261'],
    ['apricot', 'fruit', '#F2A541'],
    ['nectarine', 'fruit', '#E76F51'],
  ]),
  ...cluster('primary', 'Tropical fruit', 'white', [
    ['banana', 'banana', '#F2C94C', '#D9A82E'],
    ['lychee', 'fruit', '#E9A6A6'],
    ['mango', 'pear', '#F4B942'],
    ['melon', 'halved', '#8BC34A', '#F6B26B'],
    ['passion fruit', 'halved', '#5B2A6E', '#F2C94C'],
    ['pineapple', 'pineapple', '#F2C94C', '#B8892A'],
  ]),
  ...cluster('primary', 'Red fruit', 'red', [
    ['redcurrant', 'berries', '#E0283D', '#B01E30'],
    ['cranberry', 'berries', '#A51C30', '#7A1222'],
    ['raspberry', 'berries', '#C2185B', '#8E1042'],
    ['strawberry', 'strawberry', '#D7263D'],
    ['red cherry', 'cherry', '#B3203A'],
    ['sour cherry', 'cherry', '#D2384F'],
    ['red plum', 'fruit', '#B03A4E'],
  ]),
  ...cluster('primary', 'Black fruit', 'red', [
    ['blackcurrant', 'berries', '#2E1A3A', '#1A0E22'],
    ['cassis', 'drop', '#3A1F47', '#22102C'],
    ['blackberry', 'berries', '#2B1B2E', '#140A16'],
    ['bramble', 'berries', '#3B2440', '#22132A'],
    ['blueberry', 'berries', '#4A5FA8', '#34457E'],
    ['black cherry', 'cherry', '#4A0C1C'],
    ['black plum', 'fruit', '#4B2B5C'],
  ]),
  ...cluster('primary', 'Dried / cooked fruit', 'both', [
    ['fig', 'pear', '#6B3A5E'],
    ['prune', 'dried', '#3A2033', '#1E1018'],
    ['raisin', 'dried', '#3B2230', '#1E1018'],
    ['sultana', 'dried', '#C9A227', '#8E7218'],
    ['kirsch', 'drop', '#8E1B33', '#5A0F20'],
    ['jammy', 'jar', '#7A1F3D'],
    ['baked fruit', 'pot', '#9E2B3A'],
    ['stewed fruit', 'pot', '#7A1F3D'],
  ]),
  ...cluster('primary', 'Herbaceous', 'both', [
    ['green bell pepper', 'pepper', '#4CAF50'],
    ['grass', 'leaf', '#7CB342'],
    ['tomato leaf', 'leaf', '#4E8A3A'],
    ['asparagus', 'pod', '#7CB342', '#5E9A2E'],
    ['blackcurrant leaf', 'leaf', '#3E7B3A'],
  ]),
  ...cluster('primary', 'Herbal', 'both', [
    ['eucalyptus', 'leaf', '#7FA99B'],
    ['mint', 'leaf', '#4CAF7A'],
    ['fennel', 'seeds', '#A5A06A', '#7A7548'],
    ['dill', 'leaf', '#8BC34A'],
    ['dried herbs', 'leaf', '#8A8F5E'],
  ]),
  ...cluster('primary', 'Pungent spice', 'both', [
    ['black pepper', 'seeds', '#2B2B2B', '#000000'],
    ['white pepper', 'seeds', '#E8E1CF', '#B8B0A0'],
    ['liquorice', 'stick', '#1E1E1E', '#3A3A3A'],
  ]),
  ...cluster('primary', 'Other', 'both', [
    ['flint', 'stone', '#7B7D82'],
    ['wet stones', 'stone', '#9EA3A8'],
    ['wet wool', 'berries', '#EDE8DC', '#BEB7A6'],
  ]),
  // Fermentation aromas: cool white ferments (pear drop) and carbonic maceration (bubblegum).
  ...cluster('secondary', 'Fermentation', 'both', [
    ['pear drop', 'pear', '#F2B8C6', '#E58AA3'],
    ['bubblegum', 'drop', '#F48FB1', '#EC6A9A'],
  ]),

  // Secondary: winemaking
  ...cluster('secondary', 'Yeast (lees, autolysis)', 'white', [
    ['biscuit', 'cookie', '#D9A35B', '#9C6A2E'],
    ['bread', 'bread', '#D9A35B', '#9C6A2E'],
    ['toast', 'toast', '#D9A35B', '#9C6A2E', 'toast-yeast'],
    ['pastry', 'cookie', '#E8C27A', '#B58A3E'],
    ['brioche', 'bread', '#E8B04A', '#A8722F'],
    ['bread dough', 'bread', '#F1DDB5', '#C9B48A'],
    ['cheese', 'block', '#F3CC4A', '#C9A227', 'cheese-lees'],
  ]),
  ...cluster('secondary', 'Malolactic conversion', 'both', [
    ['butter', 'block', '#F6E27F', '#D9C24A'],
    ['cheese', 'block', '#F3CC4A', '#C9A227', 'cheese-mlc'],
    ['cream', 'drop', '#F7F0DC', '#D8CDB4'],
  ]),
  ...cluster('secondary', 'Oak', 'both', [
    ['vanilla', 'pod', '#3B2416', '#4A2E1C'],
    ['cloves', 'clove', '#5A3018'],
    ['nutmeg', 'nut', '#8B5A3C', '#5E3A24', 'nutmeg-oak'],
    ['coconut', 'halved', '#6B4A2E', '#FAF7EE'],
    ['butterscotch', 'block', '#D89A3A', '#A8722F'],
    ['toast', 'toast', '#C98A45', '#8A5A26', 'toast-oak'],
    ['cedar', 'stick', '#B5835A', '#9C6B45'],
    ['charred wood', 'stick', '#3A2A20', '#1E1510'],
    ['smoke', 'smoke', '#8C8A92', '#6F6D76'],
    ['chocolate', 'block', '#5A3A2A', '#3E2619', 'chocolate-oak'],
    ['coffee', 'bean', '#4A2C1A', '#2A160C', 'coffee-oak'],
    ['resinous', 'drop', '#C8A04A', '#9C7A2E'],
  ]),

  // Tertiary: maturation
  ...cluster('tertiary', 'Oxidative development', 'both', [
    ['almond', 'nut', '#C68E5A', '#8E5E36'],
    ['marzipan', 'block', '#EED9B7', '#C9B48A'],
    ['hazelnut', 'nut', '#A0673B', '#6B4024'],
    ['walnut', 'nut', '#9C7A4E', '#6B4E2E'],
    ['chocolate', 'block', '#5A3A2A', '#3E2619', 'chocolate-oxidative'],
    ['coffee', 'bean', '#4A2C1A', '#2A160C', 'coffee-oxidative'],
    ['toffee', 'block', '#A8652A', '#7A4418'],
    ['caramel', 'drop', '#C47A2C', '#8E5418'],
  ]),
  ...cluster('tertiary', 'Fruit development (white)', 'white', [
    ['dried apricot', 'dried', '#E0892E', '#B0611A'],
    ['marmalade', 'jar', '#E8892A'],
    ['dried apple', 'dried', '#E8C99A', '#B89A6A'],
    ['dried banana', 'dried', '#C9A060', '#8E6E38'],
  ]),
  ...cluster('tertiary', 'Fruit development (red)', 'red', [
    ['fig', 'pear', '#6B3A5E', undefined, 'fig-developed'],
    ['prune', 'dried', '#3A2033', '#1E1018', 'prune-developed'],
    ['tar', 'drop', '#1E1E1E', '#000000'],
    ['dried blackberry', 'dried', '#2B1B2E', '#120A14'],
    ['dried cranberry', 'dried', '#9E1B32', '#6A0F20'],
    ['cooked blackberry', 'pot', '#2B1B2E'],
    ['cooked red plum', 'pot', '#8E1B33'],
  ]),
  ...cluster('tertiary', 'Bottle age (white)', 'white', [
    ['petrol', 'drop', '#9DB9CC', '#6F8FA6'],
    ['kerosene', 'drop', '#C9DCE6', '#8FAABB'],
    ['cinnamon', 'stick', '#A0522D', '#7A3E1F'],
    ['ginger', 'root', '#E3C08A', '#B08A50'],
    ['nutmeg', 'nut', '#8B5A3C', '#5E3A24', 'nutmeg-bottle'],
    ['toast', 'toast', '#C98A45', '#8A5A26', 'toast-bottle'],
    ['nutty', 'nut', '#B07A48', '#7A5230'],
    ['mushroom', 'mushroom', '#8B5A3C', undefined, 'mushroom-white'],
    ['hay', 'leaf', '#D8B862'],
    ['honey', 'drop', '#E0A526', '#B07E14'],
  ]),
  ...cluster('tertiary', 'Bottle age (red)', 'red', [
    ['leather', 'hide', '#7A4A2A', '#C9A27A'],
    ['forest floor', 'leaves', '#A0522D', '#C27A2C'],
    ['earth', 'earth', '#6B4A2E'],
    ['mushroom', 'mushroom', '#8B5A3C'],
    ['game', 'antler', '#6B4A2E'],
    ['tobacco', 'leaf', '#8B5A2B'],
    ['wet leaves', 'leaves', '#7A5C3A', '#5E7A4A'],
    ['savoury', 'steak', '#8B4A3A', '#E8D3C0'],
    ['meaty', 'steak', '#A33B3B', '#F2E2D2'],
    ['farmyard', 'barn', '#A8432E', '#F4F5F2'],
  ]),
];
