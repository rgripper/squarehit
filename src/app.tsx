import { useState } from "preact/hooks";
import "./app.css";
import { CellPosition, createBattlefield, hitPosition } from "./Battlefield";

export function App() {
  const [battlefield, setBattlefield] = useState(() => createBattlefield(10, 10));
  const [gameOver, setGameOver] = useState(false);
  const [hits, setHits] = useState<CellPosition[]>([]);

  return (
    <>
      {gameOver && <h2>The game is over</h2>}
      {!gameOver && (
        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ flex: 1, width: "2rem" }}>
            {hits.map((hit) => (
              <div>
                {String.fromCharCode("A".charCodeAt(0) + hit.x)}
                {hit.y + 1}
              </div>
            ))}
          </div>
          <div style={{ flex: 3 }}>
            {battlefield.grid.map((row) => (
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${battlefield.grid.length}, 1fr)` }}>
                {row.map((cell) => (
                  <div
                    onClick={() => {
                      if (cell.hit) return;

                      setHits((x) => [...x, cell.position]);
                      const { gameOver } = hitPosition(battlefield, cell.position);
                      setGameOver(gameOver);
                      setBattlefield({ ...battlefield });
                    }}
                    style={{
                      backgroundColor: cell.ship ? "lightblue" : "white",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid #ccc",
                      cursor: "pointer",
                      width: "1.5rem",
                      height: "1.5rem",
                      color: cell.ship ? "red" : "black",
                    }}
                  >
                    {cell.hit && (cell.ship ? "X" : "⚬")}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
