import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import { joinOrCreateRoom, setAuthenToken } from "./api";
import { UserContext } from "./context/UserContext";

const TicTacToe = () =>
{
    const { userId } = React.useContext(UserContext);
    const [room, setRoom] = useState(null);
    const [board, setBoard] = useState(Array(9).fill(null));
    const [playerSymbol, setPlayerSymbol] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [status, setStatus] = useState("Waiting for opponent...");

    useEffect(() =>
    {
        const init = async () =>
        {
            const _room = await joinOrCreateRoom("tic_tac_toe");
            setRoom(_room);

            _room.onStateChange((state) =>
            {
                setBoard(state.board);
                setCurrentPlayer(state.currentPlayer);
                setStatus(state.winner
                    ? `Winner: ${state.winner}`
                    : `Current player: ${state.currentPlayer}`
                );
            });

            _room.onMessage("winner", (message) =>
            {
                const { winner, line, player } = message;
                setStatus(`Winner: ${winner}`);
            });

            _room.onMessage("draw", () =>
            {
                setStatus("Draw!");
            });

            _room.onMessage("symbol", (symbol) =>
            {
                setPlayerSymbol(symbol);
            });

            _room.onMessage("opponent-left", () =>
            {
                setStatus("Opponent left the game.");
            });

            _room.onMessage("start", (symbol) =>
            {
                setStatus(`Current player: ${symbol}`);
            });
        };

        if (userId?.length > 0)
        {
            console.log("User ID", userId);
            setAuthenToken(userId);
            init();
        }
        else
        {
            console.log("User ID not available.");
        }
    }, [userId]);

    const handleClick = (index) =>
    {
        if (playerSymbol === currentPlayer && !board[index])
        {
            room.send("move", index);
        }
    };

    if (!userId)
    {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="status">{status}</div>
            <div className="player-symbol">You are: {playerSymbol}</div>
            <Board board={board} onClick={handleClick} />
        </div>
    );
}

export default TicTacToe;