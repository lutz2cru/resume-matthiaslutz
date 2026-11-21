import type { Lang } from '~/i18n/routes';

const MONTHS: Record<Lang, string[]> = {
  fr: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

/** « 2026-09 » → « sept. 2026 » ; « 2026 » → « 2026 ». */
export function formatMonth(lang: Lang, iso: string): string {
  const [year, month] = iso.split('-');
  if (!month) return year ?? iso;
  return `${MONTHS[lang][Number(month) - 1]} ${year}`;
}

export function formatPeriod(
  lang: Lang,
  entry: { start: string; end?: string | undefined; current?: boolean; period?: { fr: string; en: string } | undefined },
): string {
  if (entry.period) return entry.period[lang];
  const start = formatMonth(lang, entry.start);
  if (entry.current) return `${start} → ${lang === 'fr' ? 'aujourd\'hui' : 'now'}`;
  if (entry.end && entry.end !== entry.start) return `${start} → ${formatMonth(lang, entry.end)}`;
  return start;
}

/** 47.322, 5.041 → « 47.32° N  05.04° E ». */
export function formatCoord(lat: number, lon: number): string {
  const la = `${Math.abs(lat).toFixed(2)}° ${lat >= 0 ? 'N' : 'S'}`;
  const lo = `${Math.abs(lon).toFixed(2).padStart(5, '0')}° ${lon >= 0 ? 'E' : 'O'}`;
  return `${la}  ${lo}`;
}

export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

/** « 2026-11 » → « nov. 2026 ». */
export function formatUpdated(lang: Lang, iso: string): string {
  return formatMonth(lang, iso);
}
