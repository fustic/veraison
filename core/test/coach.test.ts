import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkConclusions, QUALITY, suggestQuality } from '../src/coach.ts';
import { emptyNote } from '../src/sat.ts';

test('no suggestion until finish and intensity are set', () => {
  const advice = suggestQuality({ finish: null, flavourIntensity: 3, complexity: 3, balanced: true });
  assert.equal(advice.suggested, null);
});

test('long, intense and complex suggests outstanding', () => {
  const advice = suggestQuality({ finish: 4, flavourIntensity: 4, complexity: 5, balanced: true });
  assert.equal(advice.suggested, QUALITY.outstanding);
});

test('medium length and intensity with two aroma groups suggests good', () => {
  const advice = suggestQuality({ finish: 2, flavourIntensity: 2, complexity: 2, balanced: true });
  assert.equal(advice.suggested, QUALITY.good);
});

test('a short finish caps quality at good', () => {
  const advice = suggestQuality({ finish: 0, flavourIntensity: 4, complexity: 5, balanced: true });
  assert.equal(advice.suggested, QUALITY.good);
});

test('imbalance lowers the suggestion by one level', () => {
  const balanced = suggestQuality({ finish: 3, flavourIntensity: 3, complexity: 4, balanced: true });
  const unbalanced = suggestQuality({ finish: 3, flavourIntensity: 3, complexity: 4, balanced: false });
  assert.equal((balanced.suggested ?? 0) - (unbalanced.suggested ?? 0), 1);
});

test('faulty overrides everything', () => {
  assert.equal(suggestQuality({ finish: 4, flavourIntensity: 4, complexity: 5, balanced: true, faulty: true }).suggested, QUALITY.faulty);
});

test('flags conclusions that contradict the note', () => {
  const note = emptyNote('red');
  note.palate.finish = 0;
  note.nose.development = 3; // tired
  note.conclusions.quality = QUALITY.outstanding;
  note.conclusions.readiness = 0; // too young
  const advice = suggestQuality({ finish: 0, flavourIntensity: 1, complexity: 1, balanced: true });
  const warnings = checkConclusions(note, advice);
  assert.equal(warnings.length, 3);
  assert.match(warnings.join(' '), /short finish/);
  assert.match(warnings.join(' '), /tired nose/);
});
