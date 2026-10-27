// Label photos: take one with the camera or pick one from the library, then shrink and
// compress it before it is stored. Phone photos are 3–12 MB; a label stays readable at
// 1280 px on the long side as a JPEG at 60 %, which is usually 150–300 kB. If a photo is
// still too big (very busy labels), it is tried again smaller. A 240 px thumbnail (about
// 10 kB) is made at the same time for the notes list.
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import { MAX_PHOTO_BASE64, MAX_THUMB_BASE64, type NotePhoto } from '../../core/src/userdb/photos.ts';

export type PhotoSource = 'camera' | 'library';

/** Long edge in pixels and JPEG quality, tried in order until the photo is small enough. */
const STEPS: readonly [number, number][] = [
  [1280, 0.6],
  [1024, 0.5],
  [800, 0.45],
];

/** Returns the compressed photo, or null if the person backed out. */
export async function pickLabelPhoto(source: PhotoSource): Promise<NotePhoto | null> {
  if (source === 'camera' && Platform.OS !== 'web') {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) throw new Error('Camera access is off for Veraison. Turn it on in Settings › Veraison › Camera.');
  }
  const options: ImagePicker.ImagePickerOptions = { mediaTypes: 'images', quality: 1, allowsEditing: false, exif: false };
  const result = source === 'camera' ? await ImagePicker.launchCameraAsync(options) : await ImagePicker.launchImageLibraryAsync(options);
  const asset = result.canceled ? undefined : result.assets?.[0];
  return asset ? compressPhoto(asset.uri, asset.width, asset.height) : null;
}

/** Long edge of the list thumbnail: the 44 pt tile at 3× with room for cropping to a square. */
const THUMB_EDGE = 240;

async function jpeg(uri: string, width: number, height: number, edge: number, quality: number) {
  const context = ImageManipulator.manipulate(uri);
  // Sizes can be unknown (0); then resize anyway. One side given keeps the aspect ratio.
  const longest = Math.max(width, height);
  if (!longest || longest > edge) context.resize(width >= height ? { width: edge, height: null } : { width: null, height: edge });
  const image = await context.renderAsync();
  const saved = await image.saveAsync({ format: SaveFormat.JPEG, compress: quality, base64: true });
  context.release();
  image.release();
  return { width: saved.width, height: saved.height, data: (saved.base64 ?? '').replace(/^data:[^,]*,/, '') };
}

export async function compressPhoto(uri: string, width: number, height: number): Promise<NotePhoto> {
  for (const [edge, quality] of STEPS) {
    const photo = await jpeg(uri, width, height, edge, quality);
    if (!photo.data || photo.data.length > MAX_PHOTO_BASE64 * 0.8) continue;
    const small = await jpeg(uri, width, height, THUMB_EDGE, 0.6).catch(() => null);
    const thumb = small && small.data && small.data.length <= MAX_THUMB_BASE64 ? small.data : null;
    return { mime: 'image/jpeg', ...photo, thumb };
  }
  throw new Error('This photo could not be made small enough to store.');
}
