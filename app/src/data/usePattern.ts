// The tasting pattern across revealed notes: which structural field you most often
// misjudge, and in which direction. Recomputed whenever a screen comes into focus.
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FIELD_LABELS } from '../../../core/src/sat.ts';
import { tastingBias, type FieldBias } from '../../../core/src/scorer.ts';
import { getTastingNote, listTastingNotes, type NoteSummary } from '../../../core/src/userdb/notes.ts';
import { useData } from './DataProvider';

export interface Pattern {
  bias: FieldBias;
  wineType: 'red' | 'white' | 'all';
  sentence: string;
}

const STEPS = ['', 'one step', 'two steps', 'three steps'];

export function describeBias(b: FieldBias, scope: string): string {
  const steps = Math.min(3, Math.max(1, Math.round(Math.abs(b.meanSteps))));
  const dir = b.meanSteps > 0 ? 'high' : 'low';
  return `${capital(FIELD_LABELS[b.field])} is your most frequent miss: ${STEPS[steps]} ${dir} in ${b.misses} of ${b.notes} ${scope}.`;
}

function capital(t: string) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}

/** Notes list plus the strongest pattern (needs at least 3 revealed notes and 2 misses). */
export function useNotesAndPattern(): { notes: NoteSummary[]; pattern: Pattern | null; loaded: boolean } {
  const { db, content, dataVersion } = useData();
  const [state, setState] = useState<{ notes: NoteSummary[]; pattern: Pattern | null; loaded: boolean }>({ notes: [], pattern: null, loaded: false });

  useFocusEffect(
    useCallback(() => {
      let live = true;
      void (async () => {
        try {
          const notes = await listTastingNotes(db, { limit: 500 });
          const revealed = notes.filter((n) => n.revealedProfileId);
          let pattern: Pattern | null = null;
          if (revealed.length >= 3) {
            const full = (await Promise.all(revealed.map((n) => getTastingNote(db, n.id)))).filter((n) => n !== null);
            const reds = full.filter((n) => n.wineType === 'red');
            const scope = reds.length >= 3 && reds.length >= full.length / 2 ? reds : full;
            const top = tastingBias(scope, content.profileById)[0];
            if (top && top.misses >= 2) {
              const wineType = scope === reds ? 'red' : 'all';
              pattern = { bias: top, wineType, sentence: describeBias(top, wineType === 'red' ? 'red wines' : 'revealed wines') };
            }
          }
          if (live) setState({ notes, pattern, loaded: true });
        } catch (e) {
          console.warn('Could not load tasting notes', e);
          if (live) setState({ notes: [], pattern: null, loaded: true });
        }
      })();
      return () => {
        live = false;
      };
    }, [db, content, dataVersion]),
  );
  return state;
}
