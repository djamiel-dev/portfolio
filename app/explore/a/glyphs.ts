// Rectilinear letters on a 7-row grid, in the spirit of Wim Crouwel's
// grid-built alphabets. "#" is a filled cell.
const GLYPHS: Record<string, string[]> = {
  D: ["####.", "#...#", "#...#", "#...#", "#...#", "#...#", "####."],
  J: ["....#", "....#", "....#", "....#", "....#", "#...#", ".###."],
  A: [".###.", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"],
  M: ["#...#", "##.##", "#.#.#", "#.#.#", "#...#", "#...#", "#...#"],
  I: ["#", "#", "#", "#", "#", "#", "#"],
  E: ["#####", "#....", "#....", "####.", "#....", "#....", "#####"],
  L: ["#....", "#....", "#....", "#....", "#....", "#....", "#####"],
};

export const ROWS = 7;

/** Lays out a word as filled cells; one empty column between letters. */
export function layoutWord(word: string) {
  const cells: { x: number; y: number }[] = [];
  let col = 0;
  for (const ch of word.toUpperCase()) {
    const glyph = GLYPHS[ch];
    if (!glyph) continue;
    glyph.forEach((row, y) => {
      [...row].forEach((c, x) => {
        if (c === "#") cells.push({ x: col + x, y });
      });
    });
    col += glyph[0].length + 1;
  }
  return { cells, cols: col - 1, rows: ROWS };
}
