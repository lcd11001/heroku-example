import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import { joinOrCreateRoom } from "./api";

const TicTacToe = () =>
{
    const [room, setRoom] = useState(null);
    const [board, setBoard] = useState(Array(9).fill(null));
    const [playerSymbol, setPlayerSymbol] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [status, setStatus] = useState("Waiting for opponent...");

    useEffect(() =>
    {
        const init = async () =>
        {
            const room = await joinOrCreateRoom("tic_tac_toe", { name: "Player " + Math.floor(Math.random() * 1000) });
            setRoom(room);

            room.onStateChange((state) =>
            {
                console.log("New state:", state);
                setBoard(state.board);
                setCurrentPlayer(state.currentPlayer);
                if (state.currentPlayer === playerSymbol)
                {
                    setStatus("Your turn.");
                }
            });

            room.onMessage("winner", (message) =>
            {
                const { winner, line, player } = message;
                setStatus(`Winner: ${winner}`);
            });

            room.onMessage("draw", () =>
            {
                setStatus("Draw!");
            });

            room.onMessage("symbol", (symbol) =>
            {
                setPlayerSymbol(symbol);
            });

            room.onMessage("opponent-left", () =>
            {
                setStatus("Opponent left the game.");
            });

            room.onMessage("start", (symbol) =>
            {
                setStatus(`Current player: ${symbol}`);
            });
        };

        init();
    }, []);

    const handleClick = (index) =>
    {
        if (playerSymbol === currentPlayer && !board[index])
        {
            room.send("move", index);
        }
    };

    return (
        <div>
            <div className="status">{status}</div>
            <div className="player-symbol">You are: {playerSymbol}</div>
            <Board board={board} onClick={handleClick} />
        </div>
    );
}

export default TicTacToe;