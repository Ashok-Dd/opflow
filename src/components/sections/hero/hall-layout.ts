/** Where each of the 32 token slips sits in the waiting hall, in both situations. Pure data; no React. */

export const SLIP_COUNT = 32;
const PER_WINDOW = 8;
/** The 9 AM crowd is packed into columns this tall. */
const CROWD_ROWS = 8;

const START = 8.5; // 8:30 AM, left edge of the hall
const END = 13; // 1 PM, right edge

/** Position on the time axis, as a percentage of the hall width. */
export const timeToX = (hour: number) => ((hour - START) / (END - START)) * 100;

export const WINDOWS = [9, 10, 11, 12] as const;

export const AXIS = [
  { hour: 9, label: "9 AM" },
  { hour: 10, label: "10 AM" },
  { hour: 11, label: "11 AM" },
  { hour: 12, label: "12 PM" },
  { hour: 13, label: "1 PM" },
] as const;

/** Stable pseudo-random value in [-1, 1]: the crowd looks hand-placed but never changes between renders. */
function noise(i: number, salt: number) {
  const s = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return (s - Math.floor(s)) * 2 - 1;
}

const round = (v: number) => Math.round(v * 100) / 100;

export type Slip = {
  token: string;
  /** Crowded at 9 AM (x as % of hall width, row from the floor up, tilt in degrees)… */
  x0: number;
  row0: number;
  angle0: number;
  /** …and spread across the hour windows. */
  x1: number;
  row1: number;
  angle1: number;
  /** 0 to 0.5: slips set off one after another instead of all at once. */
  delay: number;
  /** 0.6 to 1.4: how far the slip leans towards the mouse. */
  depth: number;
};

export const slips: Slip[] = Array.from({ length: SLIP_COUNT }, (_, i) => {
  // Everyone arriving together is handed tokens in a jumble; booked patients hold them in order.
  const slot = (i * 13) % SLIP_COUNT;
  const window = Math.floor(i / PER_WINDOW);
  const place = i % PER_WINDOW;

  return {
    token: String(i + 1).padStart(2, "0"),
    x0: round(timeToX(8.78 + Math.floor(slot / CROWD_ROWS) * 0.19 + noise(i, 1) * 0.04)),
    row0: round((slot % CROWD_ROWS) + noise(i, 2) * 0.12),
    angle0: round(noise(i, 3) * 9),
    // Booked patients sit in neat blocks: two across, four high, in each hour's window.
    x1: round(timeToX(9.2 + window + (place % 2) * 0.34)),
    row1: Math.floor(place / 2),
    angle1: round(noise(i, 4) * 1.2),
    delay: round((i / (SLIP_COUNT - 1)) * 0.5),
    depth: round(0.6 + (noise(i, 5) + 1) * 0.4),
  };
});
