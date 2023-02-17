import { Cell, CellPosition, getCell } from "./main";

export function findFreeLine(grid: Cell[][], size: number): CellPosition[] {
  console.log(grid);

  let i = 0;
  while (i < 1000) {
    i++;
    const line = tryLine(grid, size);
    if (line) return line;
  }

  throw new Error("Failed to find a free line");
}

function tryLine(grid: Cell[][], size: number): CellPosition[] | null {
  let positions: CellPosition[] = [];
  const getRandom = (exclusiveMax: number) => Math.round(Math.random() * (exclusiveMax - 1));
  const getRandomPoint = () => ({ x: getRandom(grid[0]!.length), y: getRandom(grid.length) });
  const isOutsideGridOrOccupied = (position: CellPosition) => {
    const cell = getCell(grid, position);

    //isOccupied Or isOutsideGrid Or HasAdjacentShip
    return !cell || cell.ship;
  };

  const hasAdjacentShip = ({ x, y }: CellPosition) => {
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
  };

  const startingPoint = getRandomPoint();

  positions = [];
  for (let ix = 0; ix < size; ix++) {
    const currentPoint = { x: startingPoint.x + ix, y: startingPoint.y };

    if (isOutsideGridOrOccupied(currentPoint) || hasAdjacentShip(currentPoint)) break;
    positions.push(currentPoint);

    if (positions.length === size) return positions;
  }

  positions = [];
  for (let iy = 0; iy < size; iy++) {
    const currentPoint = { x: startingPoint.x, y: startingPoint.y + iy };
    if (isOutsideGridOrOccupied(currentPoint) || hasAdjacentShip(currentPoint)) break;

    positions.push(currentPoint);

    if (positions.length === size) return positions;
  }

  return null;
}
