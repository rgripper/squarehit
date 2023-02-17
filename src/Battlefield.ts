import { findFreeLine } from "./findFreeLine";

export type CellPosition = { x: number; y: number };

export type Ship = {
  sunk: boolean;
  positions: CellPosition[];
};

export type Cell = {
  position: CellPosition;
  ship: Ship | null;
  hit: boolean;
};
type Battlefield = {
  ships: Ship[];
  grid: Cell[][];
};
function createGrid(colCount: number, rowCount: number) {
  return new Array(rowCount)
    .fill(null)
    .map((_, y) =>
      new Array(colCount).fill(null).map((_, x): Cell => ({ position: { x, y }, hit: false, ship: null }))
    );
}

export function getCell(grid: Cell[][], { x, y }: CellPosition): Cell | undefined {
  return grid[y]?.[x];
}
function createShipRandomly(grid: Cell[][], size: number): Ship {
  let positions = findFreeLine(grid, size);
  const ship = {
    sunk: false,
    positions,
  };
  positions.forEach((pos) => (getCell(grid, pos)!.ship = ship));

  return ship;
}

export function createBattlefield(colCount: number, rowCount: number): Battlefield {
  const grid = createGrid(colCount, rowCount);
  const battleshipSize = 5;
  const destroyerSize = 4;
  return {
    grid,
    ships: [
      createShipRandomly(grid, battleshipSize),
      createShipRandomly(grid, destroyerSize),
      createShipRandomly(grid, destroyerSize),
    ],
  };
}

export function hitPosition(battlefield: Battlefield, position: CellPosition): { gameOver: boolean } {
  const cell = getCell(battlefield.grid, position);
  if (!cell) {
    throw new Error("The cell is outside the battlefield");
  }

  cell.hit = true;
  const ship = cell.ship;
  if (ship) {
    ship.sunk = ship.positions.every((position) => getCell(battlefield.grid, position)!.hit);
    if (battlefield.ships.every((ship) => ship.sunk)) {
      return { gameOver: true };
    }
  }

  return { gameOver: false };
}
