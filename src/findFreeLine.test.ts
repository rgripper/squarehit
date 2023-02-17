import { vi, describe, it, expect } from "vitest";
import { findFreeLine, tryLine } from "./findFreeLine";
import { Cell, Ship } from "./Battlefield";

describe("tryLine", () => {
  const ship: Ship = {} as any;
  it("fails if there are adjacent ships", () => {
    const grid: Cell[][] = createGrid([
      [null, ship, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);

    expect(tryLine(grid, 3, { x: 1, y: 1 })).toBe(null);
  });

  it("fails if near the end of the grid", () => {
    const grid: Cell[][] = createGrid([
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);

    expect(tryLine(grid, 3, { x: 3, y: 3 })).toBe(null);
  });

  it("succeeds if there is enough space", () => {
    const grid: Cell[][] = createGrid([
      [null, ship, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);

    const line = tryLine(grid, 3, { x: 1, y: 3 });
    expect(line).toEqual([grid[3]![1]?.position, grid[3]![2]?.position, grid[3]![3]?.position]);
  });
});

function createGrid(shipCells: (Ship | null)[][]) {
  return shipCells.map((row, y) => row.map((ship, x): Cell => ({ position: { x, y }, ship, hit: false })));
}
