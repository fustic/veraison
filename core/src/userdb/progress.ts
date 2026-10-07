// "What I've seen and what not." Only content you have opened gets a row;
// everything without a row is unseen, so coverage is always computed against
// the current content list and survives content updates.

import type { Db, Deps } from './db.ts';

export type StudyStatus = 'seen' | 'studied' | 'mastered';

export interface ContentStatus {
  contentId: string;
  firstSeenAt: string | null;
  lastSeenAt: string | null;
  viewCount: number;
  status: StudyStatus;
  checkedAgainstBook: boolean;
  beenThere: boolean;
}

interface StatusRow {
  content_id: string;
  first_seen_at: string | null;
  last_seen_at: string | null;
  view_count: number;
  status: StudyStatus;
  checked_against_book: number;
  been_there: number;
}

function fromRow(r: StatusRow): ContentStatus {
  return {
    contentId: r.content_id,
    firstSeenAt: r.first_seen_at,
    lastSeenAt: r.last_seen_at,
    viewCount: r.view_count,
    status: r.status,
    checkedAgainstBook: r.checked_against_book === 1,
    beenThere: r.been_there === 1,
  };
}

/** Call when a grape, region or aroma page is opened. */
export async function markSeen(db: Db, contentId: string, deps: Deps): Promise<void> {
  const now = deps.clock.now();
  await db.run(
    `INSERT INTO content_status (content_id, first_seen_at, last_seen_at, view_count, updated_at)
     VALUES (?, ?, ?, 1, ?)
     ON CONFLICT (content_id) DO UPDATE SET
       last_seen_at = excluded.last_seen_at,
       view_count = content_status.view_count + 1,
       updated_at = excluded.updated_at`,
    [contentId, now, now, now],
  );
}

async function upsertFlag(db: Db, contentId: string, column: string, value: string | number, deps: Deps): Promise<void> {
  const now = deps.clock.now();
  await db.run(
    `INSERT INTO content_status (content_id, ${column}, updated_at) VALUES (?, ?, ?)
     ON CONFLICT (content_id) DO UPDATE SET ${column} = excluded.${column}, updated_at = excluded.updated_at`,
    [contentId, value, now],
  );
}

export function setStudyStatus(db: Db, contentId: string, status: StudyStatus, deps: Deps): Promise<void> {
  return upsertFlag(db, contentId, 'status', status, deps);
}

export function setCheckedAgainstBook(db: Db, contentId: string, checked: boolean, deps: Deps): Promise<void> {
  return upsertFlag(db, contentId, 'checked_against_book', checked ? 1 : 0, deps);
}

export function setBeenThere(db: Db, contentId: string, beenThere: boolean, deps: Deps): Promise<void> {
  return upsertFlag(db, contentId, 'been_there', beenThere ? 1 : 0, deps);
}

export async function getStatuses(db: Db, prefix?: string): Promise<Map<string, ContentStatus>> {
  const rows = prefix
    ? await db.all<StatusRow>('SELECT * FROM content_status WHERE content_id LIKE ?', [`${prefix}%`])
    : await db.all<StatusRow>('SELECT * FROM content_status');
  return new Map(rows.map((r) => [r.content_id, fromRow(r)]));
}

export interface Coverage {
  total: number;
  unseen: number;
  seen: number;
  studied: number;
  mastered: number;
  unseenIds: string[];
}

/** Pure: coverage of a list of content ids, e.g. every appellation inside Bordeaux. */
export function coverage(contentIds: readonly string[], statuses: ReadonlyMap<string, ContentStatus>): Coverage {
  const result: Coverage = { total: contentIds.length, unseen: 0, seen: 0, studied: 0, mastered: 0, unseenIds: [] };
  for (const id of contentIds) {
    const s = statuses.get(id);
    if (!s || s.viewCount === 0) {
      result.unseen += 1;
      result.unseenIds.push(id);
    } else {
      result[s.status] += 1;
    }
  }
  return result;
}
