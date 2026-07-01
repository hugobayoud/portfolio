/**
 * The Feed's masonry rhythm, in one place: each Tile's size is picked purely
 * from its position (`TILE_PATTERN[index % TILE_PATTERN.length]`), so adding,
 * reordering, or repeating ratios here is the only knob for the whole look.
 * Every ratio is `width:height`; height is derived from the fixed `TILE_WIDTH`
 * so every Tile's box is a build-time constant — no measuring, no layout JS.
 */
const TILE_PATTERN = ['3:4', '1:1', '2:3'] as const;

/** Fixed track width every Tile occupies, in px. */
export const TILE_WIDTH = 300;

function getTileRatio(index: number): (typeof TILE_PATTERN)[number] {
  return TILE_PATTERN[index % TILE_PATTERN.length];
}

/** A Tile's fixed box height for its position, in px. */
export function getTileHeight(index: number): number {
  const [widthUnits, heightUnits] = getTileRatio(index).split(':').map(Number);
  return Math.round((TILE_WIDTH * heightUnits) / widthUnits);
}
