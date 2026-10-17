import { eventConfig } from "@/config/event";

export const startDate = new Date(eventConfig.startTime);
export const endDate = new Date(eventConfig.endTime);

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const IST_OFFSET_MS = 5.5 * 3600 * 1000;

// Manual IST conversion keeps server-rendered and client-rendered text identical (Intl output differs across runtimes).
const ist = (d: Date) => new Date(d.getTime() + IST_OFFSET_MS);

export const formatLongDate = (d: Date) => {
  const x = ist(d);
  return `${x.getUTCDate()} ${MONTHS[x.getUTCMonth()]} ${x.getUTCFullYear()}`;
};

export const formatTime = (d: Date) => {
  const x = ist(d);
  const h = x.getUTCHours();
  const m = String(x.getUTCMinutes()).padStart(2, "0");
  return `${h % 12 === 0 ? 12 : h % 12}:${m} ${h >= 12 ? "PM" : "AM"} IST`;
};

export type EventPhase = "upcoming" | "live" | "ended";

export function getPhase(now: number): EventPhase {
  if (now >= endDate.getTime()) return "ended";
  if (now >= startDate.getTime()) return "live";
  return "upcoming";
}

export function splitDuration(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}
