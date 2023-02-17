import { render } from "preact";
import { App } from "./app";
import "./index.css";

render(<App />, document.getElementById("app") as HTMLElement);

type CellPosition = { x: number; y: number };

type Ship = CellPosition[];

type Cell = {
  position: CellPosition;
  free: boolean;
  hit: boolean;
};

type Battlefield = {
  ships: Ship[];
  grid: Cell[][];
};

const createGrid = (colCount: number, rowCount: number) =>
  new Array(rowCount)
    .fill(null)
    .map((_, y) =>
      new Array(colCount).fill(null).map((_, x): Cell => ({ position: { x, y }, hit: false, free: true }))
    );

const getCell = (grid: Cell[][], { x, y }: CellPosition): Cell | undefined => grid[y]?.[x];

function createShipRandomly(grid: Cell[][], size: number): Ship {
  let positions = findFreeLine(grid, size);
  positions.forEach((pos) => (getCell(grid, pos)!.free = false));
  logGrid(grid);

  return positions;
}

function findFreeLine(grid: Cell[][], size: number): CellPosition[] {
  console.log(grid);

  const getRandom = (exclusiveMax: number) => Math.round(Math.random() * (exclusiveMax - 1));
  const getRandomPoint = () => ({ x: getRandom(grid[0]!.length), y: getRandom(grid.length) });
  const isOccupiedOrOutsideGrid = (position: CellPosition) => {
    const cell = getCell(grid, position);

    //isOccupied Or isOutsideGrid Or HasAdjacentShip
    return !cell || !cell.free;
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
    ].some((cell) => cell != null && cell.free === false);
  };

  let i = 0;

  function tryLine(): CellPosition[] | null {
    let positions: CellPosition[] = [];

    const startingPoint = getRandomPoint();

    positions = [];
    for (let ix = 0; ix < size; ix++) {
      const currentPoint = { x: startingPoint.x + ix, y: startingPoint.y };
      console.log(
        "trying point",
        getCell(grid, currentPoint),
        isOccupiedOrOutsideGrid(currentPoint),
        hasAdjacentShip(currentPoint)
      );

      if (isOccupiedOrOutsideGrid(currentPoint) || hasAdjacentShip(currentPoint)) break;
      positions.push(currentPoint);
      console.log("hor", positions);
      if (positions.length === size) return positions;
    }

    positions = [];
    for (let iy = 0; iy < size; iy++) {
      const currentPoint = { x: startingPoint.x, y: startingPoint.y + iy };
      if (isOccupiedOrOutsideGrid(currentPoint) || hasAdjacentShip(currentPoint)) break;

      positions.push(currentPoint);
      console.log("ver", positions);
      if (positions.length === size) return positions;
    }

    return null;
  }

  while (i < 1000) {
    i++;
    const line = tryLine();
    if (line) return line;
  }

  throw new Error("Failed to find a free line");
}

function createBattlefield(): Battlefield {
  const grid = createGrid(10, 10);
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

function logGrid(grid: Cell[][]) {
  const text = grid
    .map((row) => row.map((cell) => (cell.hit ? (cell.free ? "|.|" : "{X}") : cell.free ? `| |` : `{ }`)).join(""))
    .join("\n");
  console.log(text);
}

createBattlefield();
