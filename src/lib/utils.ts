import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import cookie from "js-cookie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCookie(name: string) {
  return cookie.get(name);
}

export function setCookie(name: string, value: string, expires: number = 7) {
  return cookie.set(name, value, { expires });
}

export function delCookie(name: string) {
  return cookie.remove(name);
}

export const KEY_USERNAME_LOCAL = "mijia-game-username";
export const KEY_ID_LOCAL = "mijia-game-id";
export const KEY_TOKEN = "mijia-game-token";
export const KEY_ONBOARDING = "mijia-game-onboarding";
export const KEY_PLAY_COUNT = "mijia-game-count";
export const KEY_PRIZE_ALERT = "mijia-game-prize-alert";

export const START_DATE_LEADERBOARD = "2025-06-06T10:00:00.000Z";
export const END_DATE_LEADERBOARD = "2025-06-12T16:59:59.999Z";

export function generateGridArray<T = string>(
  rows: number = 0,
  cols: number = 0,
  generator?: (rowIndex: number, colIndex: number) => T
): T[][] {
  return Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: cols }, (_, colIndex) =>
      generator
        ? generator(rowIndex, colIndex)
        : (`${String.fromCharCode(65 + rowIndex)}${colIndex + 1}` as T)
    )
  );
}

/**
 * Example usage:
 *
 * // Basic usage - creates a 3x4 grid with default cell values
 * const grid1 = generateGridArray(3, 4);
 * // Result:
 * // [
 * //   ['A1', 'A2', 'A3', 'A4'],
 * //   ['B1', 'B2', 'B3', 'B4'],
 * //   ['C1', 'C2', 'C3', 'C4']
 * // ]
 *
 * // With custom generator - creates a 2x2 grid with coordinates
 * const grid2 = generateGridArray(2, 2, (row, col) => ({ x: col, y: row }));
 * // Result:
 * // [
 * //   [{ x: 0, y: 0 }, { x: 1, y: 0 }],
 * //   [{ x: 0, y: 1 }, { x: 1, y: 1 }]
 * // ]
 *
 * // With null values - creates a 2x3 grid filled with null
 * const grid3 = generateGridArray(2, 3, () => null);
 * // Result:
 * // [
 * //   [null, null, null],
 * //   [null, null, null]
 * // ]
 */

// Example usage:
// generateGridArray(3, 4) will produce:
// [
//   ['A1', 'A2', 'A3', 'A4'],
//   ['B1', 'B2', 'B3', 'B4'],
//   ['C1', 'C2', 'C3', 'C4']
// ]
