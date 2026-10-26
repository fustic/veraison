// The reveal: what the wine actually was. Grapes (in blend order), producer, vintage,
// country, region or appellation, price, and a photo of the label (compressed before it is
// saved). Grapes and regions from the study content are suggested as you type; anything
// else is kept as free text.
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Text, TextInput } from '../../../Text';
import { COUNTRIES, matchRevealToProfile, regionCountry } from '../../../../../core/src/reveal.ts';
import { checkAlcohol } from '../../../../../core/src/explain.ts';
import { ALCOHOL_BANDS, emptyReveal, type TastingNote, type WineReveal } from '../../../../../core/src/sat.ts';
import { getTastingNote, saveReveal } from '../../../../../core/src/userdb/notes.ts';
import { getNotePhoto, setNotePhoto, type NotePhoto } from '../../../../../core/src/userdb/photos.ts';
import { LabelPhoto } from '../../../components';
import { pickLabelPhoto, type PhotoSource } from '../../../photo';
import { getSetting, setSetting } from '../../../../../core/src/userdb/settings.ts';
import { useData } from '../../../data/DataProvider';
import { mono, Panel, Pill } from '../../../tasting/parts';
import { colors } from '../../../theme';

const CURRENCIES = ['CHF', 'EUR', 'USD', 'GBP'];

const fold = (t: string) =>
  t
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();

export default function RevealScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { db, deps, content } = useData();
  const [note, setNote] = useState<TastingNote | null>(null);
  const [r, setR] = useState<WineReveal>(emptyReveal);
  const [grapeQuery, setGrapeQuery] = useState('');
  const [regionText, setRegionText] = useState('');
  const [otherCountry, setOtherCountry] = useState(false);
  const [vintageText, setVintageText] = useState('');
  const [priceText, setPriceText] = useState('');
  const [abvText, setAbvText] = useState('');
  /** undefined = pick automatically from the reveal; null = compare with nothing. */
  const [profileChoice, setProfileChoice] = useState<string | null | undefined>(undefined);
  const [photo, setPhoto] = useState<NotePhoto | null>(null);
  const [photoChanged, setPhotoChanged] = useState(false);
  const [photoBusy, setPhotoBusy] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      if (!id) return;
      const n = await getTastingNote(db, id);
      setNote(n);
      setPhoto(await getNotePhoto(db, id));
      const currency = (await getSetting(db, 'currency')) ?? 'CHF';
      const start = n?.reveal ?? { ...emptyReveal(), currency };
      setR({ ...start, currency: start.currency ?? currency });
      setRegionText(start.region ? (content.regionById.get(start.region)?.name ?? start.region) : '');
      setVintageText(start.vintage !== null ? String(start.vintage) : '');
      setPriceText(start.price !== null ? String(start.price) : '');
      setAbvText(start.abv !== null && start.abv !== undefined ? String(start.abv) : '');
      setOtherCountry(!!start.country && !COUNTRIES.some(([c]) => c === start.country));
      // Keep automatic matching unless the stored profile was picked by hand.
      if (n?.reveal && n.revealedProfileId !== matchRevealToProfile(n.reveal, n.wineType, content.profiles, content.regionById)) {
        setProfileChoice(n.revealedProfileId);
      }
    })();
  }, [db, id, content.regionById, content.profiles]);

  const update = (patch: Partial<WineReveal>) => setR((prev) => ({ ...prev, ...patch }));

  // Opens the camera or library straight from the tap (browsers require that), then compresses.
  const takePhoto = async (source: PhotoSource) => {
    setPhotoError(null);
    setPhotoBusy(true);
    try {
      const picked = await pickLabelPhoto(source);
      if (picked) {
        setPhoto(picked);
        setPhotoChanged(true);
      }
    } catch (e) {
      setPhotoError(e instanceof Error ? e.message : String(e));
    } finally {
      setPhotoBusy(false);
    }
  };

  // Grape suggestions: study grapes matching the query (name or synonym), colour first.
  const grapeSuggestions = useMemo(() => {
    const q = fold(grapeQuery);
    const colour = note?.wineType === 'white' ? 'white' : note?.wineType === 'red' ? 'red' : null;
    return content.grapes
      .filter((g) => !r.grapes.includes(g.id))
      .filter((g) => !q || [g.name, ...(g.synonyms ?? [])].some((n) => fold(n).includes(q)))
      .sort((a, b) => Number(b.colour === colour) - Number(a.colour === colour) || a.name.localeCompare(b.name))
      .slice(0, q ? 6 : 8);
  }, [grapeQuery, content.grapes, r.grapes, note?.wineType]);
  const exactGrape = grapeSuggestions.some((g) => fold(g.name) === fold(grapeQuery));

  // Typed names that match a study grape become its id, so the profile match works.
  const grapeIdFor = (t: string) => {
    const q = fold(t);
    return content.grapes.find((g) => [g.name, ...(g.synonyms ?? [])].some((n) => fold(n) === q))?.id ?? t.trim();
  };
  const addGrape = (g: string) => {
    if (!g.trim()) return;
    const value = g.startsWith('grape:') ? g : grapeIdFor(g);
    if (!r.grapes.includes(value)) update({ grapes: [...r.grapes, value] });
    setGrapeQuery('');
  };

  // Region suggestions from the study content, limited to the chosen country.
  const regionSuggestions = useMemo(() => {
    const q = fold(regionText);
    if (!q || (r.region && content.regionById.has(r.region))) return [];
    return content.regions
      .filter((x) => !r.country || regionCountry(x.id) === r.country)
      .filter((x) => fold(x.name).includes(q))
      .slice(0, 6);
  }, [regionText, r.region, r.country, content.regions, content.regionById]);

  // A typed region that exactly matches a study region (in the chosen country) becomes its id.
  const resolved = useMemo<WineReveal>(() => {
    if (!r.region || content.regionById.has(r.region)) return r;
    const q = fold(r.region);
    const hit = content.regions.find((x) => fold(x.name) === q && (!r.country || regionCountry(x.id) === r.country));
    return hit ? { ...r, region: hit.id, country: r.country ?? regionCountry(hit.id) } : r;
  }, [r, content.regions, content.regionById]);

  const autoProfile = note ? matchRevealToProfile(resolved, note.wineType, content.profiles, content.regionById) : null;
  const profileId = profileChoice === undefined ? autoProfile : profileChoice;
  const candidates = content.profiles.filter((p) => p.wineType === note?.wineType);
  const abvNumber = abvText.trim() ? Number(abvText.replace(',', '.')) : NaN;
  const abvCheck = note && Number.isFinite(abvNumber) && abvNumber > 0 && abvNumber < 25 ? checkAlcohol(note.palate.alcohol, abvNumber) : null;

  const save = async () => {
    if (!note) return;
    const vintage = /^\d{4}$/.test(vintageText) ? Number(vintageText) : null;
    const price = priceText.trim() ? Number(priceText.replace(',', '.')) : null;
    const abv = abvText.trim() ? Number(abvText.replace(',', '.')) : null;
    const pending = grapeQuery.trim() ? [...r.grapes, grapeIdFor(grapeQuery)] : r.grapes;
    await saveReveal(
      db,
      note.id,
      {
        ...resolved,
        grapes: pending,
        vintage,
        price: price !== null && Number.isFinite(price) ? price : null,
        abv: abv !== null && Number.isFinite(abv) ? abv : null,
      },
      profileId,
      deps,
    );
    if (photoChanged) await setNotePhoto(db, note.id, photo, deps);
    if (r.currency) await setSetting(db, 'currency', r.currency);
    router.back();
  };

  const remove = () =>
    Alert.alert('Remove the reveal?', 'Your tasting note stays; only what the wine was is cleared.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: async () => {
          if (note) await saveReveal(db, note.id, null, null, deps);
          router.back();
        },
      },
    ]);

  if (!note) return <View style={styles.screen} />;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.kicker}>{note.labelText ? `${note.labelText.toUpperCase()} · ` : ''}REVEAL</Text>

      {/* Label photo */}
      <Panel gap={10}>
        <Text style={styles.label}>Label photo</Text>
        {photo ? (
          <>
            <LabelPhoto photo={photo} maxHeight={280} />
            <Text style={styles.hint}>
              {photo.width} × {photo.height} · {Math.max(1, Math.round((photo.data.length * 3) / 4 / 1024))} kB
            </Text>
          </>
        ) : (
          <Text style={styles.hint}>Snap the front label to remember the bottle. The photo is shrunk and compressed on this device before it is saved.</Text>
        )}
        <View style={styles.wrap}>
          <Pill small label={photo ? 'Retake' : 'Take photo'} on={false} onPress={() => void takePhoto('camera')} />
          <Pill small label={photo ? 'Choose another' : 'Choose from photos'} on={false} onPress={() => void takePhoto('library')} />
          {photo ? (
            <Pill
              small
              label="Remove photo"
              on={false}
              onPress={() => {
                setPhoto(null);
                setPhotoChanged(true);
              }}
            />
          ) : null}
        </View>
        {photoBusy ? <Text style={styles.hint}>Compressing…</Text> : null}
        {photoError ? <Text style={[styles.hint, { color: colors.wine }]}>{photoError}</Text> : null}
        {photoChanged ? <Text style={styles.hint}>Saved with the reveal.</Text> : null}
      </Panel>

      {/* Grapes */}
      <Panel gap={10}>
        <Text style={styles.label}>Grape or grapes</Text>
        {r.grapes.length ? (
          <View style={styles.wrap}>
            {r.grapes.map((g, i) => (
              <Pressable
                key={g}
                accessibilityRole="button"
                accessibilityLabel={`Remove ${content.grapeById.get(g)?.name ?? g}`}
                onPress={() => update({ grapes: r.grapes.filter((x) => x !== g) })}
                style={styles.chosen}
              >
                <Text style={styles.chosenText}>
                  {r.grapes.length > 1 ? `${i + 1} · ` : ''}
                  {content.grapeById.get(g)?.name ?? g} ×
                </Text>
              </Pressable>
            ))}
          </View>
        ) : null}
        <TextInput
          placeholder={r.grapes.length ? 'Add another grape (blend)' : 'Type a grape, e.g. Corvina'}
          placeholderTextColor={colors.muted}
          value={grapeQuery}
          onChangeText={setGrapeQuery}
          onSubmitEditing={() => addGrape(grapeQuery)}
          returnKeyType="done"
          autoCapitalize="words"
          style={styles.input}
        />
        <View style={styles.wrap}>
          {grapeSuggestions.map((g) => (
            <Pill key={g.id} small label={g.name} on={false} onPress={() => addGrape(g.id)} />
          ))}
          {grapeQuery.trim() && !exactGrape ? <Pill small label={`Add “${grapeQuery.trim()}”`} on={false} onPress={() => addGrape(grapeQuery)} /> : null}
        </View>
        {r.grapes.length > 1 ? <Text style={styles.hint}>Blend order: main grape first. Tap a grape to remove it.</Text> : null}
      </Panel>

      {/* Producer and vintage */}
      <Panel gap={10}>
        <Text style={styles.label}>Producer</Text>
        <TextInput
          placeholder="Producer or estate"
          placeholderTextColor={colors.muted}
          value={r.producer ?? ''}
          onChangeText={(t) => update({ producer: t })}
          autoCapitalize="words"
          style={styles.input}
        />
        <Text style={styles.label}>Vintage</Text>
        <View style={styles.row}>
          <TextInput
            placeholder="e.g. 2019"
            placeholderTextColor={colors.muted}
            value={r.nonVintage ? '' : vintageText}
            editable={!r.nonVintage}
            onChangeText={(t) => setVintageText(t.replace(/\D/g, '').slice(0, 4))}
            keyboardType="number-pad"
            maxLength={4}
            style={[styles.input, { flex: 1 }, r.nonVintage && { opacity: 0.4 }]}
          />
          <Pill label="NV" on={r.nonVintage} onPress={() => update({ nonVintage: !r.nonVintage })} />
        </View>
        <Text style={styles.label}>Alcohol on the label</Text>
        <View style={styles.row}>
          <TextInput
            placeholder="e.g. 13.5"
            placeholderTextColor={colors.muted}
            value={abvText}
            onChangeText={(t) => setAbvText(t.replace(/[^\d.,]/g, '').slice(0, 5))}
            keyboardType="decimal-pad"
            style={[styles.input, { flex: 1 }]}
          />
          <Text style={styles.label}>% abv</Text>
        </View>
        {abvCheck ? (
          <Text style={[styles.hint, abvCheck.match === false && { color: colors.wine, fontWeight: '600' }]}>
            That is {abvCheck.labelWord} alcohol ({ALCOHOL_BANDS[abvCheck.labelStep]}).
            {abvCheck.saidWord ? (abvCheck.match ? ` You said ${abvCheck.saidWord}: right.` : ` You said ${abvCheck.saidWord}.`) : ''}
          </Text>
        ) : null}
      </Panel>

      {/* Country and region */}
      <Panel gap={10}>
        <Text style={styles.label}>Country</Text>
        <View style={styles.wrap}>
          {COUNTRIES.map(([code, name]) => (
            <Pill
              key={code}
              small
              label={name}
              on={r.country === code}
              onPress={() => {
                setOtherCountry(false);
                const country = r.country === code ? null : code;
                // A study region from another country no longer fits; free text stays.
                const known = r.region ? content.regionById.has(r.region) : false;
                if (known && country && regionCountry(r.region!) !== country) {
                  setRegionText('');
                  update({ country, region: null });
                } else {
                  update({ country });
                }
              }}
            />
          ))}
          <Pill small label="Other…" on={otherCountry} onPress={() => (setOtherCountry((v) => !v), update({ country: null }))} />
        </View>
        {otherCountry ? (
          <TextInput
            placeholder="Country"
            placeholderTextColor={colors.muted}
            value={r.country ?? ''}
            onChangeText={(t) => update({ country: t })}
            autoCapitalize="words"
            style={styles.input}
          />
        ) : null}

        <Text style={styles.label}>Region or appellation</Text>
        <TextInput
          placeholder="e.g. Pauillac, Chianti Classico"
          placeholderTextColor={colors.muted}
          value={regionText}
          onChangeText={(t) => {
            setRegionText(t);
            update({ region: t });
          }}
          autoCapitalize="words"
          style={styles.input}
        />
        {regionSuggestions.length ? (
          <View style={styles.suggestions}>
            {regionSuggestions.map((x) => {
              const parent = x.parentId ? content.regionById.get(x.parentId)?.name : null;
              return (
                <Pressable
                  key={x.id}
                  accessibilityRole="button"
                  onPress={() => {
                    setRegionText(x.name);
                    update({ region: x.id, country: regionCountry(x.id) ?? r.country });
                    setOtherCountry(false);
                  }}
                  style={styles.suggestion}
                >
                  <Text style={styles.suggestionText}>{x.name}</Text>
                  {parent ? <Text style={styles.hint}>{parent}</Text> : null}
                </Pressable>
              );
            })}
          </View>
        ) : null}
      </Panel>

      {/* Price */}
      <Panel gap={10}>
        <Text style={styles.label}>Price</Text>
        <View style={styles.row}>
          <TextInput
            placeholder="Bottle price"
            placeholderTextColor={colors.muted}
            value={priceText}
            onChangeText={(t) => setPriceText(t.replace(/[^\d.,]/g, ''))}
            keyboardType="decimal-pad"
            style={[styles.input, { flex: 1 }]}
          />
        </View>
        <View style={styles.wrap}>
          {CURRENCIES.map((c) => (
            <Pill key={c} small label={c} on={r.currency === c} onPress={() => update({ currency: c })} />
          ))}
        </View>
      </Panel>

      {/* Study profile used for the comparison and bias tracking */}
      <Panel gap={10}>
        <Text style={styles.label}>Compare your note with</Text>
        <Text style={styles.hint}>
          {profileChoice === undefined
            ? autoProfile
              ? 'Picked from the region and grapes. Change it if it is wrong.'
              : 'No study profile fits yet. Pick one, or leave it empty.'
            : 'Chosen by you.'}
        </Text>
        <View style={styles.wrap}>
          {candidates.map((p) => (
            <Pill key={p.id} small label={p.name} on={profileId === p.id} onPress={() => setProfileChoice(profileId === p.id ? null : p.id)} />
          ))}
        </View>
      </Panel>

      <Pressable accessibilityRole="button" onPress={save} style={({ pressed }) => [styles.primary, pressed && { opacity: 0.85 }]}>
        <Text style={styles.primaryText}>Save reveal</Text>
      </Pressable>
      {note.reveal ? (
        <Pressable accessibilityRole="button" onPress={remove} style={styles.secondary}>
          <Text style={styles.secondaryText}>Remove reveal</Text>
        </Pressable>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { padding: 16, gap: 14, paddingBottom: 48 },
  kicker: { fontFamily: mono, fontSize: 11, letterSpacing: 0.8, color: colors.muted, marginHorizontal: 4 },
  label: { fontSize: 14, fontWeight: '600', color: colors.ink },
  hint: { fontSize: 13, color: colors.muted, lineHeight: 18 },
  input: { backgroundColor: colors.surface, borderColor: colors.line, borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, height: 44, fontSize: 15, color: colors.ink },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chosen: { minHeight: 36, paddingHorizontal: 12, borderRadius: 999, backgroundColor: colors.wine, justifyContent: 'center' },
  chosenText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  suggestions: { borderWidth: 1, borderColor: colors.line, borderRadius: 12, overflow: 'hidden' },
  suggestion: { paddingHorizontal: 12, paddingVertical: 10, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.track },
  suggestionText: { fontSize: 15, color: colors.ink },
  primary: { height: 52, borderRadius: 14, backgroundColor: colors.wine, alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  secondary: { height: 48, borderRadius: 14, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  secondaryText: { color: colors.ink, fontSize: 15, fontWeight: '600' },
});
