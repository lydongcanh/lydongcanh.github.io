import React, { useState } from "react";
import produce from "immer";
import { useInterval } from "../data/useInterval";

/**
 * 
 * @param {*} props numRows, numCols, setLiveCount, birthRate, deathRate, speed[1-100], isPlaying, onCellClick(row, col)
 */
export default function LifeGrid(props) {
    const leftPad = 30;
    const size = (document.documentElement.clientWidth - leftPad) / props.numCols;
    const interval = (5000 / props.speed) ? (5000 / props.speed) : 5000;
    const [grid, setGrid] = useState(() => {
        const rows = [];
        for (let row = 0; row < props.numRows; row++) {
            const cols = [];
            for (let col = 0; col < props.numCols; col++) {
                cols[col] = "dead";
            }
            rows.push(cols);
        }
        return rows;
    });

    function getCellColor(lifeStatus) {
        if (lifeStatus === "dead") return "white";
        if (lifeStatus === "alive") return "#7befb2"; // flat green.

        return "red";
    }

    function displayGrid() {
        const rows = [];
        for (let row = 0; row < props.numRows; row++) {
            const cols = [];
            if (!grid[row])
                grid[row] = [];

            for (let col = 0; col < props.numCols; col++) {
                cols[col] = (
                    <div
                        key={`${row}${col}`}
                        style={{
                            border: `1px solid gray`,
                            width: size,
                            height: size,
                            textAlign: "center",
                            backgroundColor: getCellColor(grid[row][col])
                        }}
                        // onClick={() => {
                        //     const newGrid = produce(grid, gridCopy => {
                        //         gridCopy[row][col] = grid[row][col] === "dead" ? "alive" : "dead";
                        //     });
                        //     setGrid(newGrid);
                        // }}
                    />);
            }
            rows.push(cols);
        }
        return rows;
    }

    function playLife() {
        if (!props.isPlaying)
            return;
        
        const newGrid = produce(grid, gridCopy => {
            /** Random death. */
            let deathCells = [];
            let liveCount = 0;
            for (let row = 0; row < props.numRows; row++) {
                for (let col = 0; col < props.numCols; col++) {
                    if (gridCopy[row][col] === "alive") {
                        gridCopy[row][col] = props.deathRate > Math.floor(Math.random() * 100) ? "dead" : "alive";
                        liveCount++;
                    } else {
                        deathCells.push({row: row, col: col});
                    }
                }
            }
            
            /** Random life */
            const shouldGiveBirth = deathCells.length > 0 && props.birthRate > Math.floor(Math.random() * 100);
            if (shouldGiveBirth) {
                const randomIndex = Math.floor(Math.random() * deathCells.length);
                const randomRow = deathCells[randomIndex].row;
                const randomCol = deathCells[randomIndex].col;
                gridCopy[randomRow][randomCol] = "alive"; 
            }

            if (props.setLiveCount)
                props.setLiveCount(liveCount);
        });
        setGrid(newGrid);
    }

    useInterval(playLife, interval);

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(${props.numCols}, ${size + "px"})`,
        }}>
            {displayGrid()}
        </div>
    );
}