import { Cell, CellPosition, getCell } from "./Battlefield";

export function findFreeLine(grid: Cell[][], size: number): CellPosition[] {
  const getRandom = (exclusiveMax: number) => Math.round(Math.random() * (exclusiveMax - 1));
  const getRandomPoint = () => ({ x: getRandom(grid[0]!.length), y: getRandom(grid.length) });

  let i = 0;
  while (i < 1000) {
    i++;

    const line = tryLine(grid, size, getRandomPoint());
    if (line) return line;
  }

  throw new Error("Failed to find a free line");
}

export function tryLine(grid: Cell[][], size: number, startingPoint: CellPosition): CellPosition[] | null {
  let positions: CellPosition[] = [];

  const isOutsideGridOrHasShip = (position: CellPosition) => {
    const cell = getCell(grid, position);

    //isOccupied Or isOutsideGrid Or HasAdjacentShip
    return !cell || cell.ship;
  };

  positions = [];
  for (let ix = 0; ix < size; ix++) {
    const currentPoint = { x: startingPoint.x + ix, y: startingPoint.y };

    if (isOutsideGridOrHasShip(currentPoint) || hasAdjacentShip(grid, currentPoint)) break;
    positions.push(currentPoint);

    if (positions.length === size) return positions;
  }

  positions = [];
  for (let iy = 0; iy < size; iy++) {
    const currentPoint = { x: startingPoint.x, y: startingPoint.y + iy };
    if (isOutsideGridOrHasShip(currentPoint) || hasAdjacentShip(grid, currentPoint)) break;

    positions.push(currentPoint);

    if (positions.length === size) return positions;
  }

  return null;
}

function hasAdjacentShip(grid: Cell[][], { x, y }: CellPosition) {
  return [
    getCell(grid, { x: x - 1, y: y - 1 }),
    getCell(grid, { x: x - 1, y }),
    getCell(grid, { x: x - 1, y: y + 1 }),
    getCell(grid, { x, y: y - 1 }),
    getCell(grid, { x, y: y + 1 }),
    getCell(grid, { x: x + 1, y: y - 1 }),
    getCell(grid, { x: x + 1, y }),
    getCell(grid, { x: x + 1, y: y + 1 }),
  ].some((cell) => cell?.ship);
}
